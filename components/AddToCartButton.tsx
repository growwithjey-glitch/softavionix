"use client";

import { Product } from "@/lib/products";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
};

export default function AddToCartButton({
  product,
  className = "",
}: AddToCartButtonProps) {
  function handleAddToCart() {
    const existingCart = localStorage.getItem("cart");
    const cart: Array<Product & { quantity: number }> = existingCart
      ? JSON.parse(existingCart)
      : [];

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className={`w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-600 ${className}`}
    >
      Add to Cart
    </button>
  );
}