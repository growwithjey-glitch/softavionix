"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import { products } from "@/lib/products";

const categories = [
  "All categories",
  "Operating Systems",
  "Office Tools",
  "Security",
  "Streaming Services",
  "Subscriptions",
];

export default function MarketplaceSearchBar() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return products
      .filter((product) => {
        const matchesQuery =
          product.name.toLowerCase().includes(q) ||
          product.shortDescription.toLowerCase().includes(q) ||
        (product.category ?? "").toLowerCase().includes(q);

        const matchesCategory =
          selectedCategory === "All categories" ||
          product.category === selectedCategory;

        return matchesQuery && matchesCategory;
      })
      .slice(0, 6);
  }, [query, selectedCategory]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToResults() {
    const trimmed = query.trim();
    if (!trimmed) return;

    const params = new URLSearchParams();
    params.set("search", trimmed);

    if (selectedCategory !== "All categories") {
      params.set("category", selectedCategory);
    }

    router.push(`/products?${params.toString()}`);
    setIsOpen(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
      router.push(`/products/${suggestions[highlightedIndex].slug}`);
      setIsOpen(false);
      return;
    }

    goToResults();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!suggestions.length) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  }

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [query, selectedCategory]);

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="flex overflow-hidden rounded-full border border-white/10 bg-white"
      >
        <input
          type="text"
          placeholder="What are you looking for?"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="h-12 flex-1 px-5 text-sm text-slate-900 outline-none"
        />

        <div className="relative hidden md:block">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-12 appearance-none border-l border-slate-200 bg-slate-50 px-4 pr-10 text-sm text-slate-700 outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>

        <button
          type="submit"
          className="flex h-12 w-14 items-center justify-center bg-blue-600 text-white transition hover:bg-blue-700"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="border-b border-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Suggested Products
          </div>

          <div className="max-h-96 overflow-y-auto">
            {suggestions.map((product, index) => {
              const active = index === highlightedIndex;

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 transition ${
                    active ? "bg-blue-50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {product.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {product.category}
                    </p>
                  </div>

                  <div className="text-sm font-semibold text-slate-900">
                    ${product.price.toFixed(2)}
                  </div>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goToResults}
            className="w-full border-t border-slate-100 px-4 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
          >
            View all results for “{query.trim()}”
          </button>
        </div>
      )}
    </div>
  );
}