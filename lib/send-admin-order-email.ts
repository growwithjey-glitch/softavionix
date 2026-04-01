import { resend } from "@/lib/resend";

type AdminOrderEmailItem = {
  name: string;
  quantity: number;
  amount: number;
};

type SendAdminOrderEmailArgs = {
  customerEmail: string | null;
  customerName?: string | null;
  items: AdminOrderEmailItem[];
  amountTotal: number;
  currency?: string | null;
  sessionId: string;
  orderNumber: string | number;
};

function formatMoney(amountInCents: number, currency?: string | null) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format(amountInCents / 100);
}

export async function sendAdminOrderEmail({
  customerEmail,
  customerName,
  items,
  amountTotal,
  currency = "usd",
  sessionId,
  orderNumber,
}: SendAdminOrderEmailArgs) {
  const adminEmail = process.env.ADMIN_ORDER_EMAIL;

  if (!adminEmail) {
    throw new Error("Missing ADMIN_ORDER_EMAIL");
  }

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
  <div style="margin-bottom:20px;padding:16px;border:1px solid #dbeafe;background:#eff6ff;border-radius:14px;">
  <div style="font-size:13px;font-weight:700;color:#1d4ed8;text-transform:uppercase;">
    Order number
  </div>
  <div style="margin-top:6px;font-size:22px;font-weight:800;color:#0f172a;">
    #${orderNumber}
  </div>
  <div style="margin-top:10px;font-size:12px;color:#64748b;word-break:break-all;">
    Stripe session: ${sessionId}
  </div>
</div>
    <div style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;">
        <div style="background:#0f172a;padding:24px 28px;">
          <div style="font-size:26px;font-weight:800;color:#ffffff;">
            New order received
          </div>
          <div style="margin-top:6px;font-size:14px;color:#cbd5e1;">
            Softavionix admin notification
          </div>
        </div>

        <div style="padding:28px;">
          <div style="margin-bottom:20px;padding:16px;border:1px solid #dbeafe;background:#eff6ff;border-radius:14px;">
            <div style="font-size:13px;font-weight:700;color:#1d4ed8;text-transform:uppercase;">
              Order reference
            </div>
            <div style="margin-top:6px;font-size:14px;color:#0f172a;word-break:break-all;">
              ${sessionId}
            </div>
          </div>

          <div style="margin-bottom:22px;">
            <div style="font-size:14px;color:#64748b;">Customer name</div>
            <div style="margin-top:4px;font-size:16px;font-weight:600;color:#0f172a;">
              ${customerName ?? "Not provided"}
            </div>
          </div>

          <div style="margin-bottom:22px;">
            <div style="font-size:14px;color:#64748b;">Customer email</div>
            <div style="margin-top:4px;font-size:16px;font-weight:600;color:#0f172a;">
              ${customerEmail ?? "Not provided"}
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
        </div>
      </div>
    </div>
  `;

  const { data, error } = await resend.emails.send({
    from: process.env.ORDER_FROM_EMAIL as string,
    to: [adminEmail],
    subject: `New order received – ${formatMoney(amountTotal, currency)}`,
    html,
  });

  if (error) {
    console.error("Admin order email error:", error);
    throw new Error(JSON.stringify(error));
  }

  return data;
}