"use client";

import { useEffect, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
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
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Your Cart</h1>

      <div className="mt-10 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-5"
          >
            <div>
              <h2 className="font-medium">{item.name}</h2>
              <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between rounded-2xl bg-slate-50 p-6">
        <p className="text-lg font-medium">Total</p>
        <p className="text-2xl font-semibold">${total.toFixed(2)}</p>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white"
      >
        Proceed to Checkout
      </button>
    </main>
  );
}