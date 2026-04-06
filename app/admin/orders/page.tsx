import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import AdminOrdersTable from "@/components/AdminOrdersTable";

export const dynamic = "force-dynamic";

type AdminOrdersPageProps = {
  searchParams?: Promise<{
    status?: string;
    q?: string;
  }>;
};

const allowedStatuses = [
  "paid",
  "purchasing",
  "delivered",
  "refunded",
  "missing-cost",
];

function formatMoney(amountInCents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100);
}

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  const params = (await searchParams) || {};
  const selectedStatus = params.status?.trim() || "";
  const searchQuery = params.q?.trim() || "";

  const supabaseAdmin = getSupabaseAdmin();

  let query = supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (selectedStatus && allowedStatuses.includes(selectedStatus)) {
    if (selectedStatus === "missing-cost") {
      query = query.is("cost_price", null).neq("status", "refunded");
    } else {
      query = query.eq("status", selectedStatus);
    }
  }

  if (searchQuery) {
    query = query.or(
      `customer_email.ilike.%${searchQuery}%,id.ilike.%${searchQuery}%,stripe_session_id.ilike.%${searchQuery}%,order_number.ilike.%${searchQuery}%`
    );
  }

  const { data: orders, error } = await query;

  if (error) {
    return (
      <main className="bg-[#f7f6f1]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-900">
              Admin Orders
            </h1>
            <p className="mt-4 text-red-600">
              Failed to load orders: {error.message}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const safeOrders = orders ?? [];

  const totalRevenue = safeOrders.reduce(
    (sum, order) => sum + (order.amount_total ?? 0),
    0
  );

  const totalCost = safeOrders.reduce(
    (sum, order) => sum + (order.cost_price ?? 0),
    0
  );

  const totalProfit = totalRevenue - totalCost;
  const ordersCount = safeOrders.length;

  const missingCostCount = safeOrders.filter(
    (order) => order.cost_price === null && order.status !== "refunded"
  ).length;

  return (
    <main className="bg-[#f7f6f1]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Admin
            </p>

            <h1 className="mt-2 text-4xl font-semibold text-slate-900">
              Orders
            </h1>

            <p className="mt-3 text-slate-600">
              Review paid orders, track costs, and manage fulfillment.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/api/orders/export"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Export CSV
            </a>

            <a
              href="/api/admin/logout"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Logout
            </a>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Revenue</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {formatMoney(totalRevenue)}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Cost</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {formatMoney(totalCost)}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Profit</p>
            <p className="mt-3 text-3xl font-semibold text-green-700">
              {formatMoney(totalProfit)}
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            <p className="text-sm font-medium text-slate-500">Orders</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {ordersCount}
            </p>
            <p className="mt-3 text-sm font-medium text-slate-600">
              View all →
            </p>
          </Link>

          <Link
            href="/admin/orders?status=missing-cost"
            className="rounded-[28px] border border-amber-200 bg-amber-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-100"
          >
            <p className="text-sm font-medium text-amber-700">
              Missing Cost Orders
            </p>
            <p className="mt-3 text-3xl font-semibold text-amber-800">
              {missingCostCount}
            </p>
            <p className="mt-3 text-sm font-medium text-amber-700">
              View orders →
            </p>
          </Link>
        </div>

        <AdminOrdersTable
          orders={safeOrders}
          selectedStatus={selectedStatus}
          searchQuery={searchQuery}
        />
      </div>
    </main>
  );
}