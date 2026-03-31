import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="
        group overflow-hidden rounded-[28px] border border-slate-200 bg-white
        shadow-sm transition-all duration-300
        hover:-translate-y-1.5 hover:border-slate-300
        hover:shadow-[0_18px_45px_rgba(15,23,42,0.14)]
      "
    >
      <div className="relative overflow-hidden bg-[#f8fafc] p-5">
        <div className="absolute left-4 top-4 z-10 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm">
          ✓ In stock
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[220px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 220px, (max-width: 1280px) 200px, 220px"
            className="
              object-contain transition-transform duration-300
              group-hover:scale-[1.05]
            "
          />
        </div>

        <div
          className="
            pointer-events-none absolute inset-x-0 bottom-0 h-20
            bg-gradient-to-t from-slate-200/30 to-transparent
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100
          "
        />
      </div>

      <div className="p-6">
        <h2 className="line-clamp-2 text-lg font-semibold leading-7 text-slate-900 transition-colors duration-300 group-hover:text-blue-700">
          {product.name}
        </h2>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-2xl font-semibold text-slate-900">
              ${product.price.toFixed(2)}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Digital delivery
            </p>
          </div>

          {product.featured && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              Featured
            </span>
          )}
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="
            mt-6 inline-flex w-full items-center justify-center rounded-xl
            bg-slate-900 px-5 py-3 text-sm font-semibold text-white
            transition-all duration-300
            hover:bg-slate-800
            group-hover:bg-blue-600 group-hover:text-white
          "
        >
          View Product
        </Link>

        <p className="mt-4 text-center text-xs font-medium tracking-wide text-slate-500">
          ⚡ Delivered by email • Global activation
        </p>
      </div>
    </div>
  );
}