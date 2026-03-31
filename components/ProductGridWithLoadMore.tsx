"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/products";

type ProductGridWithLoadMoreProps = {
  products: Product[];
  initialCount?: number;
  loadMoreCount?: number;
};

export default function ProductGridWithLoadMore({
  products,
  initialCount = 9,
  loadMoreCount = 6,
}: ProductGridWithLoadMoreProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount]
  );

  const hasMore = visibleCount < products.length;

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + loadMoreCount)}
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            Load More Products
          </button>

          <p className="mt-3 text-sm text-slate-500">
            Showing {visibleProducts.length} of {products.length} products
          </p>
        </div>
      )}
    </div>
  );
}