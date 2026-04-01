import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const { orderId, costPrice, supplier } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing orderId" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const updates: {
      cost_price?: number | null;
      supplier?: string | null;
    } = {};

    if (costPrice !== undefined) {
      const parsed = Number(costPrice);

      if (Number.isNaN(parsed) || parsed < 0) {
        return NextResponse.json(
          { error: "Invalid costPrice" },
          { status: 400 }
        );
      }

      updates.cost_price = Math.round(parsed * 100);
    }

    if (supplier !== undefined) {
      updates.supplier = supplier?.trim() || null;
    }

    const { error } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", orderId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update profit error:", err);

    return NextResponse.json(
      { error: "Failed to update profit data" },
      { status: 500 }
    );
  }
}