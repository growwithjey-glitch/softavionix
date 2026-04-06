"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";

export default function SearchBar() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    return products
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(q) ||
          product.shortDescription.toLowerCase().includes(q) ||
        (product.category ?? "").toLowerCase().includes(q)
        );
      })
      .slice(0, 6);
  }, [query]);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
      router.push(`/products/${suggestions[highlightedIndex].slug}`);
      setIsOpen(false);
      return;
    }

    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!suggestions.length) return;

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
      inputRef.current?.blur();
    }
  }

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [query]);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
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
          className="h-11 w-full rounded-full border border-slate-200 bg-white px-5 pr-12 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="submit"
          className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
          aria-label="Search"
        >
          🔍
        </button>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Suggested Products
          </div>

          <div className="max-h-96 overflow-y-auto">
            {suggestions.map((product, index) => {
              const isActive = index === highlightedIndex;

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 transition ${
                    isActive ? "bg-blue-50" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-500">
                    IMG
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
            onClick={() => {
              const trimmed = query.trim();
              if (!trimmed) return;
              router.push(`/products?search=${encodeURIComponent(trimmed)}`);
              setIsOpen(false);
            }}
            className="w-full border-t border-slate-100 px-4 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
          >
            View all results for “{query.trim()}”
          </button>
        </div>
      )}
    </div>
  );
}