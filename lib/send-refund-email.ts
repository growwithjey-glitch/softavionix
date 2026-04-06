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
  currency = "usd",
  orderNumber,
}: SendRefundEmailArgs) {
  const html = `
    <div style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;">
          <div style="background:#0f172a;padding:28px 32px;">
            <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">
              Softavionix
            </div>
            <div style="margin-top:8px;font-size:14px;color:#cbd5e1;">
              Refund confirmation
            </div>
          </div>

          <div style="padding:32px;">
            <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;color:#0f172a;">
              Your refund has been processed
            </h1>

            <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#475569;">
              ${customerName ? `Hi ${customerName},` : "Hello,"}
              your refund has been successfully processed.
            </p>

            <div style="margin:0 0 24px;padding:16px 18px;border:1px solid #fee2e2;background:#fef2f2;border-radius:16px;">
              <div style="font-size:13px;color:#991b1b;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">
                Order number
              </div>
              <div style="margin-top:6px;font-size:22px;font-weight:800;color:#0f172a;">
                #${orderNumber ?? "N/A"}
              </div>
              <div style="margin-top:12px;font-size:14px;color:#475569;">
                Refunded amount
              </div>
              <div style="margin-top:6px;font-size:24px;font-weight:700;color:#991b1b;">
                ${formatMoney(amountTotal, currency)}
              </div>
            </div>

            <div style="margin-top:20px;padding:18px;border:1px solid #e2e8f0;background:#f8fafc;border-radius:16px;">
              <div style="font-size:14px;font-weight:700;color:#0f172a;">
                What happens next
              </div>
              <ul style="margin:10px 0 0 18px;padding:0;color:#475569;font-size:14px;line-height:1.8;">
                <li>The refund will be returned to your original payment method.</li>
                <li>Processing time depends on your bank or card provider.</li>
                <li>If you have questions, contact support@softavionix.com.</li>
              </ul>
            </div>
          </div>

          <div style="padding:20px 32px;border-top:1px solid #e2e8f0;background:#f8fafc;font-size:13px;line-height:1.7;color:#64748b;">
            Softavionix • Digital products delivered electronically • No physical shipping
          </div>
        </div>
      </div>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: process.env.ORDER_FROM_EMAIL as string,
    to: [customerEmail],
    subject: "Your refund has been processed",
    html,
  });

  if (error) {
    console.error("Refund email error:", error);
    throw new Error(JSON.stringify(error));
  }

  return data;
}