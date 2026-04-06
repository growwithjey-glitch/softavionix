import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f6f1] px-6 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[4/3] bg-[#f8f8f6]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-10"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Softavionix
            </p>

            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
              {product.name}
            </h1>

            {product.category && (
              <div className="mt-4">
                <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  {product.category}
                </span>
              </div>
            )}

            <p className="mt-6 text-4xl font-semibold tracking-tight text-slate-900">
              ${product.price.toFixed(2)}
            </p>

            <p className="mt-6 text-base leading-8 text-slate-600">
              {product.shortDescription}
            </p>

            <div className="mt-8 max-w-sm">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-8 rounded-[24px] border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
              ✓ In stock • Digital delivery available
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Product Description
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {product.description}
              </p>
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Delivery Information
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>• Delivered electronically by email after payment confirmation</li>
                <li>• Most orders are prepared within a few minutes</li>
                <li>• In rare cases, delivery can take up to 30 minutes</li>
                <li>• If you need help, contact support@softavionix.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}