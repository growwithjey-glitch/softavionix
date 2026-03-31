"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  slug?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  shortDescription?: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  function updateQuantity(id: string, nextQuantity: number) {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, nextQuantity) }
          : item
      )
      .filter(Boolean);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  function removeItem(id: string) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  async function handleCheckout() {
    if (!cart.length || isLoading) return;

    try {
      setIsLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Unable to start checkout.");
      }
    } catch {
      alert("Something went wrong while starting checkout.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!cart.length) {
    return (
      <main className="bg-[#f7f6f1]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
          <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Cart
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">
              Your cart is empty
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Browse digital software, subscriptions, and license keys to add
              products before checkout.
            </p>

            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex items-center rounded-full bg-slate-900 px-7 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f6f1]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Checkout
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-900">
            Review your order
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Secure checkout, digital delivery by email, and support if you need
            help.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left: cart items */}
          <section className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-50">
                    {item.image ? (
                      <div className="relative h-24 w-24">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-xs font-medium text-slate-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold leading-8 text-slate-900">
                          {item.name}
                        </h2>

                        {item.shortDescription && (
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                            {item.shortDescription}
                          </p>
                        )}

                        <p className="mt-3 text-sm font-medium text-slate-500">
                          Digital delivery by email
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <p className="text-2xl font-semibold text-slate-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-slate-700 transition hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span className="min-w-[44px] text-center text-sm font-semibold text-slate-900">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-slate-700 transition hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        {item.slug && (
                          <Link
                            href={`/products/${item.slug}`}
                            className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                          >
                            View product
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-sm font-medium text-red-600 transition hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Right: order summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Delivery</span>
                  <span>Email delivery</span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-slate-900">
                      Total
                    </span>
                    <span className="text-3xl font-semibold text-slate-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading || !cart.length}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Redirecting..." : "Proceed to Secure Checkout"}
              </button>

              <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <p>✓ Secure checkout</p>
                <p>✓ Digital products delivered electronically</p>
                <p>✓ Support available if you need help after purchase</p>
              </div>

              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Refunds apply only where eligible under our policy for digital
                goods.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}