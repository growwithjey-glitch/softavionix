import Stripe from "stripe";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const stripe = new Stripe(stripeSecretKey);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get purchased items from Stripe
      const lineItems =
        await stripe.checkout.sessions.listLineItems(
          session.id,
          { limit: 100 }
        );

      const items = lineItems.data.map((item) => ({
        name: item.description,
        quantity: item.quantity ?? 1,
        amount: item.amount_total ?? 0,
      }));

      // Save order to Supabase
      const { error } = await supabaseAdmin
        .from("orders")
        .insert({
          stripe_session_id: session.id,
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id ?? null,
          customer_email:
            session.customer_details?.email ?? null,
          customer_name:
            session.customer_details?.name ?? null,
          amount_total: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          payment_status:
            session.payment_status ?? null,
          status: "paid",
          items,
        });

      if (error) {
        console.error("Database error:", error);
        return new Response("Database error", {
          status: 500,
        });
      }

      console.log("Order saved:", session.id);
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Webhook failed", {
      status: 500,
    });
  }
}