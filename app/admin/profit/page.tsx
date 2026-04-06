import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import ProfitChart from "@/components/ProfitChart";

export const dynamic = "force-dynamic";

type AdminProfitPageProps = {
  searchParams?: Promise<{
    range?: string;
  }>;
};

const allowedRanges = ["today", "7d", "month", "all"];

function formatMoney(amountInCents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100);
}

function getRangeDates(range: string) {
  const now = new Date();
  const start = new Date(now);

  if (range === "today") {
    start.setHours(0, 0, 0, 0);
    return { start, end: now };
  }

  if (range === "7d") {
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    return { start, end: now };
  }

  if (range === "month") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    return { start, end: now };
  }

  return null;
}

function getMonthBounds(offsetMonths = 0) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() + offsetMonths, 1);
  const end = new Date(now.getFullYear(), now.getMonth() + offsetMonths + 1, 0, 23, 59, 59, 999);
  return { start, end };
}

function calculateTotals(
  orders: Array<{
    amount_total?: number | null;
    cost_price?: number | null;
  }>
) {
  const revenue = orders.reduce((sum, order) => sum + (order.amount_total ?? 0), 0);
  const cost = orders.reduce((sum, order) => sum + (order.cost_price ?? 0), 0);
  const profit = revenue - cost;

  return { revenue, cost, profit };
}

export default async function AdminProfitPage({
  searchParams,
}: AdminProfitPageProps) {
  const params = (await searchParams) || {};
  const selectedRange = allowedRanges.includes(params.range ?? "")
    ? (params.range as string)
    : "all";

  const supabaseAdmin = getSupabaseAdmin();

  const { data: allOrders, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="bg-[#f7f6f1]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-900">
              Profit Dashboard
            </h1>
            <p className="mt-4 text-red-600">
              Failed to load dashboard: {error.message}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const allSafeOrders = allOrders ?? [];

  const rangeDates = getRangeDates(selectedRange);

  const safeOrders = rangeDates
    ? allSafeOrders.filter((order) => {
        const createdAt = new Date(order.created_at);
        return createdAt >= rangeDates.start && createdAt <= rangeDates.end;
      })
    : allSafeOrders;

  const totalRevenue = safeOrders.reduce(
    (sum, order) => sum + (order.amount_total ?? 0),
    0
  );

  const totalCost = safeOrders.reduce(
    (sum, order) => sum + (order.cost_price ?? 0),
    0
  );

  const totalProfit = totalRevenue - totalCost;

  const deliveredRevenue = safeOrders
    .filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + (order.amount_total ?? 0), 0);

  const refundedRevenue = safeOrders
    .filter((order) => order.status === "refunded")
    .reduce((sum, order) => sum + (order.amount_total ?? 0), 0);

  const missingCostCount = safeOrders.filter(
    (order) => order.cost_price === null && order.status !== "refunded"
  ).length;

  const totalOrders = safeOrders.length;

  const deliveredOrders = safeOrders.filter(
    (order) => order.status === "delivered"
  ).length;

  const refundedOrders = safeOrders.filter(
    (order) => order.status === "refunded"
  ).length;

  const purchasingOrders = safeOrders.filter(
    (order) => order.status === "purchasing"
  ).length;

  const recentOrders = safeOrders.slice(0, 8);
  const monthlyMap = new Map<
  string,
  { label: string; revenue: number; cost: number; profit: number }
>();

for (const order of allSafeOrders) {
  const createdAt = new Date(order.created_at);
  const key = `${createdAt.getFullYear()}-${String(
    createdAt.getMonth() + 1
  ).padStart(2, "0")}`;

  const label = createdAt.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  const revenue = order.amount_total ?? 0;
  const cost = order.cost_price ?? 0;
  const profit = revenue - cost;

  if (!monthlyMap.has(key)) {
    monthlyMap.set(key, {
      label,
      revenue: 0,
      cost: 0,
      profit: 0,
    });
  }

  const current = monthlyMap.get(key)!;
  current.revenue += revenue;
  current.cost += cost;
  current.profit += profit;
}

const monthlyChartData = Array.from(monthlyMap.entries())
  .sort(([a], [b]) => a.localeCompare(b))
  .slice(-6)
  .map(([, value]) => value);

  const currentMonthBounds = getMonthBounds(0);
  const lastMonthBounds = getMonthBounds(-1);

  const currentMonthOrders = allSafeOrders.filter((order) => {
    const createdAt = new Date(order.created_at);
    return createdAt >= currentMonthBounds.start && createdAt <= currentMonthBounds.end;
  });

  const lastMonthOrders = allSafeOrders.filter((order) => {
    const createdAt = new Date(order.created_at);
    return createdAt >= lastMonthBounds.start && createdAt <= lastMonthBounds.end;
  });

  const currentMonthTotals = calculateTotals(currentMonthOrders);
  const lastMonthTotals = calculateTotals(lastMonthOrders);

  const profitChange =
    lastMonthTotals.profit === 0
      ? null
      : ((currentMonthTotals.profit - lastMonthTotals.profit) / lastMonthTotals.profit) * 100;

  const rangeLinks = [
    { label: "Today", value: "today" },
    { label: "Last 7 Days", value: "7d" },
    { label: "This Month", value: "month" },
    { label: "All Time", value: "all" },
  ];

  return (
    <main className="bg-[#f7f6f1]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Admin
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900">
              Profit Dashboard
            </h1>
            <p className="mt-3 text-slate-600">
              Revenue, costs, profit, refunds, and fulfillment overview.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`/api/orders/export${
                selectedRange && selectedRange !== "all"
                  ? `?${new URLSearchParams({ range: selectedRange }).toString()}`
                  : ""
              }`}
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Export CSV
            </a>

            <Link
              href="/admin/orders"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to Orders
            </Link>

            <a
              href="/api/admin/logout"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Logout
            </a>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {rangeLinks.map((range) => (
            <Link
              key={range.value}
              href={`/admin/profit?range=${range.value}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedRange === range.value
                  ? "bg-black text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {range.label}
            </Link>
          ))}
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">This Month Revenue</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {formatMoney(currentMonthTotals.revenue)}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">This Month Cost</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {formatMoney(currentMonthTotals.cost)}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">This Month Profit</p>
            <p className="mt-3 text-3xl font-semibold text-green-700">
              {formatMoney(currentMonthTotals.profit)}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Last Month Profit</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {formatMoney(lastMonthTotals.profit)}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Change vs Last Month</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {profitChange === null
                ? "—"
                : `${profitChange >= 0 ? "+" : ""}${profitChange.toFixed(1)}%`}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Revenue</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {formatMoney(totalRevenue)}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Cost</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {formatMoney(totalCost)}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Profit</p>
            <p className="mt-3 text-3xl font-semibold text-green-700">
              {formatMoney(totalProfit)}
            </p>
          </div>

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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Delivered Revenue
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {formatMoney(deliveredRevenue)}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Refunded Revenue
            </p>
            <p className="mt-3 text-3xl font-semibold text-red-700">
              {formatMoney(refundedRevenue)}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Total Orders</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {totalOrders}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Purchasing Orders
            </p>
            <p className="mt-3 text-3xl font-semibold text-amber-700">
              {purchasingOrders}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Delivered</p>
            <p className="mt-3 text-3xl font-semibold text-green-700">
              {deliveredOrders}
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Refunded</p>
            <p className="mt-3 text-3xl font-semibold text-red-700">
              {refundedOrders}
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            <p className="text-sm font-medium text-slate-500">Orders Page</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              Open
            </p>
            <p className="mt-3 text-sm font-medium text-slate-600">
              Manage orders →
            </p>
          </Link>
        </div>
<div className="mt-10">
  <ProfitChart data={monthlyChartData} />
</div>
        <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Recent Orders
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Quick view of the latest activity.
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-3">Order #</th>
                  <th className="px-3">Customer</th>
                  <th className="px-3">Status</th>
                  <th className="px-3">Revenue</th>
                  <th className="px-3">Cost</th>
                  <th className="px-3">Profit</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const profit =
                    (order.amount_total ?? 0) - (order.cost_price ?? 0);

                  return (
                    <tr key={order.id} className="rounded-2xl bg-slate-50">
                      <td className="px-3 py-4 text-sm font-semibold text-slate-900">
                        #{order.order_number ?? "—"}
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-700">
                        {order.customer_email ?? "No email"}
                      </td>
                      <td className="px-3 py-4 text-sm capitalize text-slate-700">
                        {order.status ?? "paid"}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-slate-900">
                        {formatMoney(order.amount_total ?? 0)}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-slate-900">
                        {formatMoney(order.cost_price ?? 0)}
                      </td>
                      <td className="px-3 py-4 text-sm font-semibold text-green-700">
                        {formatMoney(profit)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}