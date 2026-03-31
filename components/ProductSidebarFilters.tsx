"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const categoryOptions = [
  "Operating Systems",
  "Office Tools",
  "Security",
  "Streaming Services",
  "Subscriptions",
];

const priceRanges = [
  { label: "All Prices", min: "", max: "" },
  { label: "Under $20", min: "", max: "20" },
  { label: "$20 to $50", min: "20", max: "50" },
  { label: "$50 to $100", min: "50", max: "100" },
  { label: "Over $100", min: "100", max: "" },
];

export default function ProductSidebarFilters() {
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sort") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentFeatured = searchParams.get("featured") || "";

  function buildHref({
    category,
    minPrice,
    maxPrice,
    featured,
  }: {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    featured?: string;
  }) {
    const params = new URLSearchParams();

    const finalCategory = category ?? currentCategory;
    const finalMinPrice = minPrice ?? currentMinPrice;
    const finalMaxPrice = maxPrice ?? currentMaxPrice;
    const finalFeatured = featured ?? currentFeatured;

    if (currentSearch) params.set("search", currentSearch);
    if (currentSort) params.set("sort", currentSort);
    if (finalCategory) params.set("category", finalCategory);
    if (finalMinPrice) params.set("minPrice", finalMinPrice);
    if (finalMaxPrice) params.set("maxPrice", finalMaxPrice);
    if (finalFeatured === "true") params.set("featured", "true");

    return `/products${params.toString() ? `?${params.toString()}` : ""}`;
  }

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Filters</h2>

        <Link
          href="/products"
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Clear all
        </Link>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Category
        </h3>

        <div className="mt-4 space-y-2">
          <Link
            href={buildHref({
              category: "",
              minPrice: currentMinPrice,
              maxPrice: currentMaxPrice,
              featured: currentFeatured,
            })}
            className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
              !currentCategory
                ? "bg-black text-white"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            All Categories
          </Link>

          {categoryOptions.map((category) => (
            <Link
              key={category}
              href={buildHref({
                category,
                minPrice: currentMinPrice,
                maxPrice: currentMaxPrice,
                featured: currentFeatured,
              })}
              className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                currentCategory === category
                  ? "bg-black text-white"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Price Range
        </h3>

        <div className="mt-4 space-y-2">
          {priceRanges.map((range) => {
            const isActive =
              (range.min || "") === currentMinPrice &&
              (range.max || "") === currentMaxPrice;

            return (
              <Link
                key={range.label}
                href={buildHref({
                  minPrice: range.min,
                  maxPrice: range.max,
                  category: currentCategory,
                  featured: currentFeatured,
                })}
                className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {range.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Product Type
        </h3>

        <div className="mt-4 space-y-2">
          <Link
            href={buildHref({
              featured: "",
              category: currentCategory,
              minPrice: currentMinPrice,
              maxPrice: currentMaxPrice,
            })}
            className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
              currentFeatured !== "true"
                ? "bg-black text-white"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            All Products
          </Link>

          <Link
            href={buildHref({
              featured: "true",
              category: currentCategory,
              minPrice: currentMinPrice,
              maxPrice: currentMaxPrice,
            })}
            className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
              currentFeatured === "true"
                ? "bg-black text-white"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Featured Only
          </Link>
        </div>
      </div>
    </aside>
  );
}