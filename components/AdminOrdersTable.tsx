"use client";

import Link from "next/link";
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
  delivery_note: string | null;
  items: {
    name: string;
    quantity: number;
    amount: number;
  }[] | null;
  created_at: string;
  delivered_at: string | null;
};

const statuses = ["paid", "purchasing", "delivered", "refunded"];

function formatMoney(amountInCents: number | null, currency?: string | null) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency ?? "usd").toUpperCase(),
  }).format((amountInCents ?? 0) / 100);
}

function getStatusTone(status: string | null) {
  switch (status) {
    case "paid":
      return "bg-blue-50 text-blue-700";
    case "purchasing":
      return "bg-amber-50 text-amber-700";
    case "delivered":
      return "bg-green-50 text-green-700";
    case "refunded":
      return "bg-red-50 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function CopyButton({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert(`Failed to copy ${label}`);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function AdminOrdersTable({
  orders,
  selectedStatus,
  searchQuery = "",
}: {
  orders: OrderRow[];
  selectedStatus?: string;
  searchQuery?: string;
}) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [noteByOrder, setNoteByOrder] = useState<Record<string, string>>({});
  const [searchInput, setSearchInput] = useState(searchQuery);

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

  async function sendDelivery(orderId: string) {
    try {
      setLoadingId(orderId);

      const res = await fetch("/api/orders/send-delivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          deliveryNote: noteByOrder[orderId] ?? "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to send delivery email");
        return;
      }

      alert("Delivery email sent successfully.");
      router.refresh();
    } catch {
      alert("Something went wrong while sending the delivery email.");
    } finally {
      setLoadingId(null);
    }
  }
  async function resendDelivery(orderId: string) {
  try {
    setLoadingId(orderId);

    const res = await fetch("/api/orders/resend-delivery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to resend delivery email");
      return;
    }

    alert("Delivery email resent successfully.");
  } catch {
    alert("Something went wrong while resending the delivery email.");
  } finally {
    setLoadingId(null);
  }
}

  function buildFilterHref(status?: string, q?: string) {
    const params = new URLSearchParams();

    if (status) {
      params.set("status", status);
    }

    if (q) {
      params.set("q", q);
    }

    return `/admin/orders${params.toString() ? `?${params.toString()}` : ""}`;
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(buildFilterHref(selectedStatus, searchInput.trim()));
  }

  return (
    <div>
      <div className="mb-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <form onSubmit={handleSearchSubmit} className="flex flex-1 gap-3">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by customer email, order ID, or Stripe session ID"
              className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Search
            </button>
          </form>

          {(selectedStatus || searchQuery) && (
            <Link
              href="/admin/orders"
              className="rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              Clear Filters
            </Link>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={buildFilterHref("", searchQuery)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              !selectedStatus
                ? "bg-black text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            All
          </Link>

          {statuses.map((status) => (
            <Link
              key={status}
              href={buildFilterHref(status, searchQuery)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                selectedStatus === status
                  ? "bg-black text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {status}
            </Link>
          ))}
        </div>
      </div>

      {!orders.length ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">No orders found</h2>
          <p className="mt-3 text-slate-600">
            Try a different search or filter.
          </p>
        </div>
      ) : (
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

                    {order.customer_email && (
                      <CopyButton
                        value={order.customer_email}
                        label="customer email"
                      />
                    )}

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusTone(
                        order.status
                      )}`}
                    >
                      {order.status ?? "paid"}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span>Order ID: {order.id}</span>
                    <CopyButton value={order.id} label="order ID" />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span>Stripe Session: {order.stripe_session_id}</span>
                    <CopyButton
                      value={order.stripe_session_id}
                      label="Stripe session ID"
                    />
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Created: {new Date(order.created_at).toLocaleString()}
                  </p>

                  {order.delivered_at && (
  <p className="mt-1 text-sm text-green-600">
    Delivered: {new Date(order.delivered_at).toLocaleString()}
  </p>
)}

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

                  <div className="mt-5">
                    <label className="text-sm font-semibold text-slate-900">
                      Delivery note / credentials / instructions
                    </label>
                    <textarea
                      value={noteByOrder[order.id] ?? order.delivery_note ?? ""}
                      onChange={(e) =>
                        setNoteByOrder((prev) => ({
                          ...prev,
                          [order.id]: e.target.value,
                        }))
                      }
                      rows={5}
                      placeholder="Paste license key, account details, download link, or instructions here..."
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                    />
                  </div>
                </div>

              <div className="w-full lg:w-[280px]">
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

    <div className="mt-4 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => updateStatus(order.id, "purchasing")}
        disabled={loadingId === order.id || order.status === "purchasing"}
        className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 disabled:opacity-50"
      >
        {order.status === "purchasing" ? "Purchasing" : "Mark Purchasing"}
      </button>

      <button
        type="button"
        onClick={() => updateStatus(order.id, "delivered")}
        disabled={loadingId === order.id || order.status === "delivered"}
        className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100 disabled:opacity-50"
      >
        {order.status === "delivered" ? "Delivered" : "Mark Delivered"}
      </button>
    </div>

<button
  type="button"
  onClick={() => {
    const note = noteByOrder[order.id] ?? order.delivery_note ?? "";

    if (!note.trim()) {
      alert("Please enter delivery details before sending.");
      return;
    }

    sendDelivery(order.id);
  }}
  disabled={loadingId === order.id}
  className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
>
  {loadingId === order.id ? "Sending..." : "Send Delivery Email"}
</button>

{order.status === "delivered" && (
  <button
    type="button"
    onClick={() => resendDelivery(order.id)}
    disabled={loadingId === order.id}
    className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
  >
    {loadingId === order.id
      ? "Resending..."
      : "Resend Delivery Email"}
  </button>
)}
  </div>
</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}