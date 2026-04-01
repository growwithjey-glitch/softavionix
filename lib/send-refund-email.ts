import { resend } from "@/lib/resend";

type SendRefundEmailArgs = {
  customerEmail: string;
  customerName?: string | null;
  amountTotal: number;
  currency?: string | null;
  orderNumber?: string | number | null;
};

function formatMoney(amountInCents: number, currency?: string | null) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format(amountInCents / 100);
}

export async function sendRefundEmail({
  customerEmail,
  customerName,
  amountTotal,
  currency,
  orderNumber,
}: SendRefundEmailArgs) {
  const html = `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;">
        
        <div style="background:#0f172a;padding:28px;color:#ffffff;">
          <div style="font-size:26px;font-weight:800;">
            Refund processed
          </div>
        </div>

        <div style="padding:28px;">
          <p style="font-size:16px;color:#0f172a;">
            ${customerName ? `Hi ${customerName},` : "Hello,"}
          </p>

          <p style="margin-top:12px;font-size:15px;color:#475569;">
            Your refund has been successfully processed.
          </p>

          <div style="margin-top:18px;padding:16px;border:1px solid #fee2e2;background:#fef2f2;border-radius:14px;">
            <div style="font-size:13px;font-weight:700;color:#991b1b;text-transform:uppercase;">
              Order number
            </div>

            <div style="margin-top:6px;font-size:22px;font-weight:800;color:#0f172a;">
              #${orderNumber}
            </div>

            <div style="margin-top:10px;font-size:18px;font-weight:700;color:#991b1b;">
              Refunded: ${formatMoney(amountTotal, currency)}
            </div>
          </div>

          <p style="margin-top:20px;font-size:14px;color:#475569;">
            The funds will be returned to your original payment method. 
            Processing time depends on your bank or card provider.
          </p>

          <p style="margin-top:16px;font-size:14px;color:#475569;">
            If you have any questions, contact support@softavionix.com.
          </p>
        </div>

      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: process.env.ORDER_FROM_EMAIL as string,
    to: [customerEmail],
    subject: "Your refund has been processed",
    html,
  });

  if (error) {
    console.error("Refund email error:", error);
  }
}