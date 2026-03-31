"use client";

import AddToCartButton from "@/components/AddToCartButton";
import { Product } from "@/lib/products";

export default function StickyAddToCartBar({
  product,
}: {
  product: Product;
}) {
  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        z-50
        border-t border-slate-200
        bg-white/95
        backdrop-blur
        shadow-[0_-8px_30px_rgba(0,0,0,0.12)]
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          gap-4
          px-6
          py-4
        "
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {product.name}
          </p>

          <p className="text-sm font-medium text-slate-500">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <AddToCartButton
          product={product}
          className="
            h-12
            px-8
            rounded-full
            bg-slate-900
            text-white
            hover:bg-slate-800
          "
        />
      </div>
    </div>
  );
}