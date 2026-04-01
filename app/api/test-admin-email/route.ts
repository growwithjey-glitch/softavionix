import { sendAdminOrderEmail } from "@/lib/send-admin-order-email";

export async function GET() {
  try {
    const result = await sendAdminOrderEmail({
      customerEmail: "customer@example.com",
      customerName: "Test Customer",
      amountTotal: 2999,
      currency: "usd",
      sessionId: "admin-test-session-123",
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
    console.error("Test admin email failed:", error);
    return Response.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}