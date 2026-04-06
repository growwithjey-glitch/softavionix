import { getSupabaseAdmin } from "@/lib/supabase-admin";

function csvEscape(value: unknown) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
const cronSecret = process.env.CRON_SECRET;
const userAgent = req.headers.get("user-agent") || "";

const isVercelCron = userAgent.includes("vercel-cron/1.0");

if (!isVercelCron && cronSecret && authHeader !== `Bearer ${cronSecret}`) {
  return new Response("Unauthorized", { status: 401 });
}

    const supabase = getSupabaseAdmin();

    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Backup fetch error:", error);
      return new Response("Failed to load orders", { status: 500 });
    }

    const headers = [
      "order_number",
      "order_id",
      "stripe_session_id",
      "customer_email",
      "customer_name",
      "status",
      "revenue",
      "cost",
      "profit",
      "supplier",
      "created_at",
      "delivered_at",
      "refunded_at",
    ];

    const rows = (orders ?? []).map((order) => {
      const revenue = order.amount_total ?? 0;
      const cost = order.cost_price ?? 0;
      const profit = revenue - cost;

      return [
        order.order_number ?? "",
        order.id ?? "",
        order.stripe_session_id ?? "",
        order.customer_email ?? "",
        order.customer_name ?? "",
        order.status ?? "",
        (revenue / 100).toFixed(2),
        (cost / 100).toFixed(2),
        (profit / 100).toFixed(2),
        order.supplier ?? "",
        order.created_at ?? "",
        order.delivered_at ?? "",
        order.refunded_at ?? "",
      ];
    });

    const csv = [
      headers.map(csvEscape).join(","),
      ...rows.map((row) => row.map(csvEscape).join(",")),
    ].join("\n");

    const now = new Date();
    const yyyy = now.getUTCFullYear();
    const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(now.getUTCDate()).padStart(2, "0");
    const hh = String(now.getUTCHours()).padStart(2, "0");
    const min = String(now.getUTCMinutes()).padStart(2, "0");
    const ss = String(now.getUTCSeconds()).padStart(2, "0");

    const filePath = `orders/orders-backup-${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}.csv`;

    const { error: uploadError } = await supabase.storage
      .from("backups")
      .upload(filePath, new Blob([csv], { type: "text/csv;charset=utf-8" }), {
        contentType: "text/csv",
        upsert: false,
      });

    if (uploadError) {
      console.error("Backup upload error:", uploadError);
      return new Response("Failed to upload backup", { status: 500 });
    }

    return Response.json({
      ok: true,
      filePath,
      rows: rows.length,
    });
  } catch (error) {
    console.error("Backup route error:", error);
    return new Response("Backup failed", { status: 500 });
  }
}