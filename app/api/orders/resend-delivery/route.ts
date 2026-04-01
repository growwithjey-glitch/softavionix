import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendDeliveryEmail } from "@/lib/send-delivery-email";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing orderId" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (!order.delivery_note) {
      return NextResponse.json(
        { error: "No delivery note found" },
        { status: 400 }
      );
    }

  await sendDeliveryEmail({
  customerEmail: order.customer_email,
  customerName: order.customer_name,
  sessionId: order.stripe_session_id,
  deliveryNote: order.delivery_note,
  orderNumber: order.order_number,
  items: order.items,
});

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error("Resend delivery error:", err);

    return NextResponse.json(
      { error: "Failed to resend delivery email" },
      { status: 500 }
    );
  }
}