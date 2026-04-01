import { resend } from "@/lib/resend";

type DeliveryEmailItem = {
  name: string;
  quantity: number;
  amount: number;
};

type SendDeliveryEmailArgs = {
  customerEmail: string;
  customerName?: string | null;
  items: DeliveryEmailItem[];
  sessionId: string;
  deliveryNote?: string | null;
};

export async function sendDeliveryEmail({
  customerEmail,
  customerName,
  items,
  sessionId,
  deliveryNote,
}: SendDeliveryEmailArgs) {
  const itemsHtml = items
    .map(
      (item) => `
        <li style="margin:0 0 8px;">
          ${item.name} × ${item.quantity}
        </li>
      `
    )
    .join("");

  const noteBlock = deliveryNote
    ? `
      <div style="margin-top:20px;padding:18px;border:1px solid #dbeafe;background:#eff6ff;border-radius:16px;">
        <div style="font-size:14px;font-weight:700;color:#1d4ed8;">
          Delivery Details
        </div>
        <div style="margin-top:8px;font-size:14px;line-height:1.8;color:#0f172a;white-space:pre-wrap;">
          ${deliveryNote}
        </div>
      </div>
    `
    : `
      <div style="margin-top:20px;padding:18px;border:1px solid #dcfce7;background:#f0fdf4;border-radius:16px;">
        <div style="font-size:14px;font-weight:700;color:#166534;">
          Your order is ready
        </div>
        <div style="margin-top:8px;font-size:14px;line-height:1.8;color:#166534;">
          Your digital product has been prepared and delivered. If you need help
          with activation or access, reply to this email or contact support@softavionix.com.
        </div>
      </div>
    `;

  const html = `
    <div style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
        <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;">
          <div style="background:#0f172a;padding:28px 32px;">
            <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">
              Softavionix
            </div>
            <div style="margin-top:8px;font-size:14px;color:#cbd5e1;">
              Order delivery
            </div>
          </div>

          <div style="padding:32px;">
            <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;color:#0f172a;">
              Your order is ready
            </h1>

            <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#475569;">
              ${customerName ? `Hi ${customerName},` : "Hello,"}
              your order has now been fulfilled.
            </p>

            <div style="margin:0 0 24px;padding:16px 18px;border:1px solid #e2e8f0;background:#f8fafc;border-radius:16px;">
              <div style="font-size:13px;color:#64748b;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">
                Order reference
              </div>
              <div style="margin-top:6px;font-size:14px;color:#0f172a;word-break:break-all;">
                ${sessionId}
              </div>
            </div>

            <h2 style="margin:0 0 14px;font-size:18px;color:#0f172a;">
              Delivered items
            </h2>

            <ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.8;color:#0f172a;">
              ${itemsHtml}
            </ul>

            ${noteBlock}
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
    subject: "Your Softavionix order has been delivered",
    html,
  });

  if (error) {
    console.error("Delivery email error:", error);
    throw new Error(JSON.stringify(error));
  }

  return data;
}