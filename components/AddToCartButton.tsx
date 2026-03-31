"use client";

import { Product } from "@/lib/products";

type CartProduct = Product & {
  quantity?: number;
};

export default function AddToCartButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const handleAddToCart = () => {
    const existing: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const found = existing.find((item) => item.id === product.id);

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
      className={`rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 ${className}`}
    >
      Add to Cart
    </button>
  );
}