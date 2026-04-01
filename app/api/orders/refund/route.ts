import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (!order.stripe_payment_intent_id) {
      return NextResponse.json(
        { error: "Stripe payment intent not found for this order" },
        { status: 400 }
      );
    }

    if (order.status === "refunded") {
      return NextResponse.json(
        { error: "Order is already refunded" },
        { status: 400 }
      );
    }

    const refund = await stripe.refunds.create({
      payment_intent: order.stripe_payment_intent_id,
    });

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "refunded",
        refunded_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      refundId: refund.id,
    });
  } catch (err) {
    console.error("Refund error:", err);

    return NextResponse.json(
      { error: "Failed to refund order" },
      { status: 500 }
    );
  }
}