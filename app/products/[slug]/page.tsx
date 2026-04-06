import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";

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

  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  return (
    <main className="min-h-screen bg-[#f7f6f1]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <ProductGallery name={product.name} images={gallery} />
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Softavionix
            </p>

            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
              {product.name}
            </h1>

            {product.category && (
              <div className="mt-5">
                <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  {product.category}
                </span>
              </div>
            )}

            <div className="mt-6 flex items-end gap-3">
              <p className="text-4xl font-semibold tracking-tight text-slate-900">
                ${product.price.toFixed(2)}
              </p>
              <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                In stock
              </span>
            </div>

            <p className="mt-6 text-base leading-8 text-slate-600">
              {product.shortDescription}
            </p>

            <div className="mt-8 max-w-sm">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Delivery
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Delivered electronically by email after payment confirmation.
                  Most orders are prepared within a few minutes.
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Support
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Activation help available. If you need assistance, contact
                  support@softavionix.com.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
              ✓ Fast email delivery • Digital product only • No physical shipping
            </div>

            <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                Product Description
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {product.description}
              </p>
            </div>

            <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                What You Receive
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>• Digital product delivered by email</li>
                <li>• Activation key / access details where applicable</li>
                <li>• Instructions for setup or activation</li>
                <li>• Support if you need help with delivery or activation</li>
              </ul>
            </div>

            <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                Delivery & Activation
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>• Most orders are delivered within a few minutes</li>
                <li>• In rare cases, delivery can take up to 30 minutes</li>
                <li>• Please check your inbox and spam/junk folder</li>
                <li>• Contact support if you do not receive your order</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}