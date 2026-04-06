"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.07),transparent_30%)]" />

          <div className="relative flex h-full items-center justify-center p-5">
            <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-contain p-4 transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="min-h-[64px] text-[1.9rem] font-semibold leading-8 text-slate-900 transition group-hover:text-blue-600 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 min-h-[56px] text-sm leading-7 text-slate-600 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4">
          <p className="text-3xl font-semibold tracking-tight text-slate-900">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div className="mt-5">
          <AddToCartButton product={product} />
        </div>

        <p className="mt-4 text-sm text-slate-500">
          ⚡ Delivered by email • Global activation
        </p>
      </div>
    </div>
  );
}