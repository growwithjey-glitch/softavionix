"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

export default function ActiveFilterChips() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const featured = searchParams.get("featured") || "";

  const hasFilters =
    Boolean(category) ||
    Boolean(search) ||
    Boolean(sort) ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    featured === "true";

  if (!hasFilters) return null;

  function removeParam(param: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(param);
    return `/products${params.toString() ? `?${params.toString()}` : ""}`;
  }

  const priceLabel =
    minPrice && maxPrice
      ? `$${minPrice} – $${maxPrice}`
      : minPrice
      ? `Over $${minPrice}`
      : maxPrice
      ? `Under $${maxPrice}`
      : "";

  const sortLabelMap: Record<string, string> = {
    featured: "Featured",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
    "name-asc": "Name: A to Z",
    "name-desc": "Name: Z to A",
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {search && (
        <Link
          href={removeParam("search")}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Search: {search}
          <X className="h-4 w-4" />
        </Link>
      )}

      {category && (
        <Link
          href={removeParam("category")}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Category: {category}
          <X className="h-4 w-4" />
        </Link>
      )}

      {priceLabel && (
        <>
          <Link
            href={(() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("minPrice");
              params.delete("maxPrice");
              return `/products${params.toString() ? `?${params.toString()}` : ""}`;
            })()}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Price: {priceLabel}
            <X className="h-4 w-4" />
          </Link>
        </>
      )}

      {featured === "true" && (
        <Link
          href={removeParam("featured")}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Featured Only
          <X className="h-4 w-4" />
        </Link>
      )}

      {sort && sort !== "featured" && (
        <Link
          href={removeParam("sort")}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Sort: {sortLabelMap[sort] || sort}
          <X className="h-4 w-4" />
        </Link>
      )}

      <Link
        href="/products"
        className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
      >
        Clear All
      </Link>
    </div>
  );
}