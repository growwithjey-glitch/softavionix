"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const categories = [
  "All",
  "Operating Systems",
  "Office Tools",
  "Security",
  "Streaming Services",
  "Subscriptions",
];

export default function ProductFilters() {
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "All";
  const currentSearch = searchParams.get("search") || "";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map((category) => {
        const isActive =
          (category === "All" && !searchParams.get("category")) ||
          currentCategory === category;

        const params = new URLSearchParams();

        if (category !== "All") {
          params.set("category", category);
        }

        if (currentSearch) {
          params.set("search", currentSearch);
        }

        return (
          <Link
            key={category}
            href={`/products${
              params.toString() ? `?${params.toString()}` : ""
            }`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-black text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {category}
          </Link>
        );
      })}

      {(currentCategory !== "All" || currentSearch) && (
        <Link
          href="/products"
          className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          Clear filters
        </Link>
      )}
    </div>
  );
}