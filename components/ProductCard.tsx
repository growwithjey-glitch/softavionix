import Link from "next/link";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[4/3] bg-slate-100" />
      <div className="p-6">
        <h2 className="line-clamp-2 text-lg font-semibold">{product.name}</h2>
        <p className="mt-3 text-sm text-slate-600">{product.shortDescription}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}