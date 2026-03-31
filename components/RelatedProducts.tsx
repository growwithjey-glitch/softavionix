import { Product, products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function RelatedProducts({
  currentProduct,
}: {
  currentProduct: Product;
}) {
  const related = products
    .filter(
      (p) =>
        p.category === currentProduct.category &&
        p.id !== currentProduct.id
    )
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="mt-20">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-slate-900">
          You may also like
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Similar digital products in the same category
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}