import { sendOrderConfirmationEmail } from "@/lib/send-order-confirmation-email";

export async function GET() {
  try {
    const result = await sendOrderConfirmationEmail({
      customerEmail: "jeywfg@gmail.com",
      customerName: "Test Customer",
      amountTotal: 2999,
      currency: "usd",
      sessionId: "test-session-123",
      items: [
        {
          name: "Test Product",
          quantity: 1,
          amount: 2999,
        },
      ],
    });

    return Response.json({ ok: true, result });
  } catch (error) {
    console.error("Test email failed:", error);
    return Response.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}