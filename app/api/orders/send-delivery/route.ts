import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendDeliveryEmail } from "@/lib/send-delivery-email";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const body = await req.json();

    const orderId = body.orderId as string | undefined;
    const deliveryNote = body.deliveryNote as string | undefined;

    if (!orderId) {
      return Response.json({ error: "Missing orderId" }, { status: 400 });
    }

    const { data: order, error: fetchError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (fetchError || !order) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    if (!order.customer_email) {
      return Response.json(
        { error: "Customer email missing on order" },
        { status: 400 }
      );
    }

    await sendDeliveryEmail({
      customerEmail: order.customer_email,
      customerName: order.customer_name ?? null,
      sessionId: order.stripe_session_id,
      items: order.items ?? [],
      deliveryNote: deliveryNote ?? null,
    });

    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        status: "delivered",
        delivered_at: new Date().toISOString(),
        delivery_note: deliveryNote ?? null,
      })
      .eq("id", orderId);

    if (updateError) {
      return Response.json(
        { error: updateError.message },
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