import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import StickyAddToCartBar from "@/components/StickyAddToCartBar";
import RelatedProducts from "@/components/RelatedProducts";
import ProductInfoAccordion from "@/components/ProductInfoAccordion";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) return notFound();

  return (
   <main className="bg-white text-slate-900">
  <div className="mx-auto max-w-7xl px-6 py-16 pb-32 md:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          ...(product.category
            ? [
                {
                  label: product.category,
                  href: `/products?category=${encodeURIComponent(product.category)}`,
                },
              ]
            : []),
          { label: product.name },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Product image */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="relative aspect-square overflow-hidden rounded-[24px] bg-[#f8fafc]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-contain p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Product info */}
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Softavionix
          </p>

          <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-900">
            {product.name}
          </h1>

          {product.category && (
            <p className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {product.category}
            </p>
          )}

          <p className="mt-6 text-3xl font-semibold text-slate-900">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-6 text-base leading-7 text-slate-600">
            {product.description}
          </p>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
              ✓ In stock • Digital delivery available
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
              This is a digital product. After successful payment, your order
              will be delivered electronically by email.
            </div>
          </div>
        </div>
      </div>

      {/* Detail sections */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Delivery Information
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>• Delivered electronically by email after payment confirmation</li>
            <li>• No physical item is shipped</li>
            <li>• Please check spam or junk folders if you do not see the email</li>
            <li>• Keep your order email for support and verification</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Activation & Access
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>• Activation or access instructions are provided where applicable</li>
            <li>• Some products may require a supported platform or region</li>
            <li>• Follow all included steps carefully during activation</li>
            <li>• Contact support if you experience access issues</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Compatibility
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>• Please review the product title and description before purchase</li>
            <li>• Make sure the product matches your device, platform, or intended usage</li>
            <li>• Region restrictions may apply depending on the product</li>
            <li>• If a product has specific limitations, they should be checked before checkout</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Important Notes
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>• All products sold on Softavionix are digital products only</li>
            <li>• Refund eligibility is subject to the Refund Policy</li>
            <li>• Secure checkout and support are available for order-related issues</li>
            <li>• If you need help, contact support@softavionix.com</li>
          </ul>
        </section>
      </div>
      <ProductInfoAccordion />
      <RelatedProducts currentProduct={product} />
      <StickyAddToCartBar product={product} />
      </div>
    </main>
  );
}