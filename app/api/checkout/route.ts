import Stripe from "stripe";

export async function POST(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return Response.json(
      { error: "Missing STRIPE_SECRET_KEY environment variable" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey);

  const { items } = await req.json();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${siteUrl}/success`,
    cancel_url: `${siteUrl}/cart`,
  });

  return Response.json({ url: session.url });
}