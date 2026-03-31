"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export default function ProductSort() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSort = searchParams.get("sort") || "featured";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="product-sort"
        className="text-sm font-medium text-slate-600"
      >
        Sort by
      </label>

      <select
        id="product-sort"
        value={currentSort}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}