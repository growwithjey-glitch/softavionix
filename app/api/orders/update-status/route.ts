import { getSupabaseAdmin } from "@/lib/supabase-admin";

const allowedStatuses = ["paid", "purchasing", "delivered", "refunded"] as const;

type AllowedStatus = (typeof allowedStatuses)[number];

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await req.json();

    const orderId = body.orderId as string | undefined;
    const status = body.status as AllowedStatus | undefined;

    if (!orderId || !status) {
      return Response.json(
        { error: "Missing orderId or status" },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return Response.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}