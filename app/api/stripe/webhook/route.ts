import Stripe from "stripe";
import { headers } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  sendOrderConfirmationEmail,
  type OrderEmailItem,
} from "@/lib/send-order-confirmation-email";
import { sendAdminOrderEmail } from "@/lib/send-admin-order-email";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const stripe = new Stripe(stripeSecretKey);

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin();

  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("Webhook received for session:", session.id);
      console.log("Customer email:", session.customer_details?.email);

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
      });

      const items: OrderEmailItem[] = lineItems.data.map((item) => ({
        name: item.description ?? "Digital Product",
        quantity: item.quantity ?? 1,
        amount: item.amount_total ?? 0,
      }));

      const { data: insertedOrder, error } = await supabaseAdmin
        .from("orders")
        .insert({
          stripe_session_id: session.id,
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id ?? null,
          customer_email: session.customer_details?.email ?? null,
          customer_name: session.customer_details?.name ?? null,
          amount_total: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          payment_status: session.payment_status ?? null,
          status: "paid",
          items,
        })
        .select()
        .single();

      if (error || !insertedOrder) {
        console.error("Database error:", error);
        return new Response("Database error", { status: 500 });
      }

      console.log("Order saved:", insertedOrder.id);

      const orderNumber =
        insertedOrder.order_number ??
        `${new Date().getFullYear()}${String(Date.now()).slice(-6)}`;

      if (!insertedOrder.order_number) {
        const { error: orderNumberError } = await supabaseAdmin
          .from("orders")
          .update({ order_number: orderNumber })
          .eq("id", insertedOrder.id);

        if (orderNumberError) {
          console.error("Order number update failed:", orderNumberError);
        }
      }

      if (session.customer_details?.email) {
        try {
          console.log(
            "Preparing confirmation email for:",
            session.customer_details.email
          );

          const emailResult = await sendOrderConfirmationEmail({
            customerEmail: session.customer_details.email,
            customerName: session.customer_details?.name ?? null,
            amountTotal: session.amount_total ?? 0,
            currency: session.currency ?? "usd",
            sessionId: session.id,
            orderNumber,
            items,
          });

          console.log("Order confirmation email sent:", emailResult);
        } catch (emailError) {
          console.error("Order confirmation email failed:", emailError);
        }
      } else {
        console.warn("No customer email found on session:", session.id);
      }

      try {
        console.log(
          "Preparing admin order email for:",
          process.env.ADMIN_ORDER_EMAIL
        );

        const adminEmailResult = await sendAdminOrderEmail({
          customerEmail: session.customer_details?.email ?? null,
          customerName: session.customer_details?.name ?? null,
          amountTotal: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          sessionId: session.id,
          items,
          orderNumber,
        });

        console.log("Admin order email sent:", adminEmailResult);
      } catch (adminEmailError) {
        console.error("Admin order email failed:", adminEmailError);
      }
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Webhook failed", { status: 500 });
  }
}