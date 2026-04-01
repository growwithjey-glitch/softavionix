import { resend } from "@/lib/resend";

export type OrderEmailItem = {
  name: string;
  quantity: number;
  amount: number;
};
type SendOrderConfirmationEmailArgs = {
  customerEmail: string;
  customerName?: string | null;
  items: OrderEmailItem[];
  amountTotal: number;
  currency?: string | null;
  sessionId: string;
};

function formatMoney(amountInCents: number, currency?: string | null) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format(amountInCents / 100);
}

export async function sendOrderConfirmationEmail({
  customerEmail,
  customerName,
  items,
  amountTotal,
  currency = "usd",
  sessionId,
}: SendOrderConfirmationEmailArgs) {
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;color:#0f172a;font-size:14px;">
            ${item.name}
          </td>
          <td style="padding:10px 0;color:#475569;font-size:14px;text-align:center;">
            ${item.quantity}
          </td>
          <td style="padding:10px 0;color:#0f172a;font-size:14px;text-align:right;font-weight:600;">
            ${formatMoney(item.amount, currency)}
          </td>
        </tr>
      `
    )
    .join("");

  const html = `
    <div style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;">
          <div style="background:#0f172a;padding:28px 32px;">
            <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">
              Softavionix
            </div>
            <div style="margin-top:8px;font-size:14px;color:#cbd5e1;">
              Order confirmation
            </div>
          </div>

          <div style="padding:32px;">
            <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;color:#0f172a;">
              Thank you for your order
            </h1>

            <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#475569;">
              ${
                customerName
                  ? `Hi ${customerName},`
                  : "Hello,"
              }
              your payment was received successfully. Your digital product will be reviewed and delivered by email.
            </p>

            <div style="margin:0 0 24px;padding:16px 18px;border:1px solid #dbeafe;background:#eff6ff;border-radius:16px;">
              <div style="font-size:13px;color:#1d4ed8;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">
                Order reference
              </div>
              <div style="margin-top:6px;font-size:14px;color:#0f172a;word-break:break-all;">
                ${sessionId}
              </div>
            </div>

            <h2 style="margin:0 0 14px;font-size:18px;color:#0f172a;">
              Order summary
            </h2>

            <table style="width:100%;border-collapse:collapse;">
              <thead>
                <tr>
                  <th style="padding:0 0 10px;text-align:left;font-size:12px;color:#64748b;text-transform:uppercase;">Product</th>
                  <th style="padding:0 0 10px;text-align:center;font-size:12px;color:#64748b;text-transform:uppercase;">Qty</th>
                  <th style="padding:0 0 10px;text-align:right;font-size:12px;color:#64748b;text-transform:uppercase;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="margin-top:18px;padding-top:18px;border-top:1px solid #e2e8f0;text-align:right;">
              <div style="font-size:14px;color:#475569;">Order total</div>
              <div style="margin-top:6px;font-size:24px;font-weight:700;color:#0f172a;">
                ${formatMoney(amountTotal, currency)}
              </div>
            </div>

            <div style="margin-top:28px;padding:18px;border:1px solid #dcfce7;background:#f0fdf4;border-radius:16px;">
              <div style="font-size:14px;font-weight:700;color:#166534;">
                What happens next
              </div>
              <ul style="margin:10px 0 0 18px;padding:0;color:#166534;font-size:14px;line-height:1.8;">
                <li>Your order will be processed and delivered electronically by email.</li>
                <li>Please check your inbox and spam/junk folder.</li>
                <li>If you need help, reply to this email or contact support@softavionix.com.</li>
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
  subject: "Your Softavionix order confirmation",
  html,
});

if (error) {
  console.error("Resend send error:", error);
  throw new Error(JSON.stringify(error));
}

console.log("Resend success:", data);
return data;
}