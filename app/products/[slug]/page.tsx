import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square rounded-3xl bg-slate-100" />

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Softavionix
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">
            {product.name}
          </h1>
          <p className="mt-6 text-3xl font-semibold">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-6 text-base leading-7 text-slate-600">
            {product.description}
          </p>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            This is a digital product. After successful payment, your order will
            be reviewed and fulfilled by email.
          </div>
        </div>
      </div>
    </main>
  );
}