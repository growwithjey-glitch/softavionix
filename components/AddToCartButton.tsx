"use client";

import { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const handleAddToCart = () => {
    const existing = JSON.parse(localStorage.getItem("cart") || "[]");

    const found = existing.find((item: Product) => item.id === product.id);

    if (found) {
      found.quantity = (found.quantity || 1) + 1;
    } else {
      existing.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existing));
    alert("Added to cart");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white"
    >
      Add to Cart
    </button>
  );
}