"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type OrderRow = {
  id: string;
  stripe_session_id: string;
  customer_email: string | null;
  customer_name: string | null;
  amount_total: number | null;
  currency: string | null;
  status: string | null;
  items: {
    name: string;
    quantity: number;
    amount: number;
  }[] | null;
  created_at: string;
};

const statuses = ["paid", "purchasing", "delivered", "refunded"];

function formatMoney(amountInCents: number | null, currency?: string | null) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format((amountInCents ?? 0) / 100);
}

export default function AdminOrdersTable({
  orders,
}: {
  orders: OrderRow[];
}) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function updateStatus(orderId: string, status: string) {
    try {
      setLoadingId(orderId);

      const res = await fetch("/api/orders/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to update order status");
        return;
      }

      router.refresh();
    } catch {
      alert("Something went wrong while updating the order status");
    } finally {
      setLoadingId(null);
    }
  }

  if (!orders.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">No orders yet</h2>
        <p className="mt-3 text-slate-600">
          Orders will appear here after checkout is completed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-slate-900">
                  {order.customer_email ?? "No email"}
                </h2>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  {order.status ?? "paid"}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Order ID: {order.id}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Stripe Session: {order.stripe_session_id}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Created: {new Date(order.created_at).toLocaleString()}
              </p>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Order Items
                </p>

                <div className="mt-3 space-y-2">
                  {(order.items ?? []).map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900">
                          {item.name}
                        </p>
                        <p className="text-slate-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <div className="shrink-0 font-semibold text-slate-900">
                        {formatMoney(item.amount, order.currency)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[240px]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Order Total
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {formatMoney(order.amount_total, order.currency)}
                </p>

                <label className="mt-5 block text-sm font-medium text-slate-700">
                  Update Status
                </label>

                <select
                  value={order.status ?? "paid"}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  disabled={loadingId === order.id}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                {loadingId === order.id && (
                  <p className="mt-3 text-sm text-slate-500">Updating...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}