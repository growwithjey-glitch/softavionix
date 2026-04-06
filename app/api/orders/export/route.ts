import { getSupabaseAdmin } from "@/lib/supabase-admin";

const allowedStatuses = [
  "paid",
  "purchasing",
  "delivered",
  "refunded",
  "missing-cost",
];

function csvEscape(value: unknown) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status")?.trim() || "";
    const q = searchParams.get("q")?.trim() || "";

    const supabase = getSupabaseAdmin();

    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (status && allowedStatuses.includes(status)) {
      if (status === "missing-cost") {
        query = query.is("cost_price", null).neq("status", "refunded");
      } else {
        query = query.eq("status", status);
      }
    }

    if (q) {
      query = query.or(
        `customer_email.ilike.%${q}%,id.ilike.%${q}%,stripe_session_id.ilike.%${q}%,order_number.ilike.%${q}%`
      );
    }

    const { data: orders, error } = await query;

    if (error) {
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

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="orders-export.csv"`,
      },
    });
  } catch (error) {
    console.error("Export CSV error:", error);
    return new Response("Failed to export CSV", { status: 500 });
  }
}