"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f8f8f6]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-contain p-6 transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="line-clamp-2 text-xl font-semibold leading-8 text-slate-900 transition group-hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-3xl font-semibold tracking-tight text-slate-900">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <AddToCartButton product={product} />
        </div>

        <div className="mt-4 text-sm text-slate-500">
          ⚡ Delivered by email • Global activation
        </div>
      </div>
    </div>
  );
}