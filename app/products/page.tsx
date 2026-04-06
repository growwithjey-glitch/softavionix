import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import ProductSort from "@/components/ProductSort";
import ProductSidebarFilters from "@/components/ProductSidebarFilters";
import ActiveFilterChips from "@/components/ActiveFilterChips";
import ProductGridWithLoadMore from "@/components/ProductGridWithLoadMore";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import Breadcrumbs from "@/components/Breadcrumbs";

type ProductsPageProps = {
  searchParams?: Promise<{
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    featured?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = (await searchParams) || {};

  const selectedCategory = params.category?.trim() || "";
  const searchQuery = params.search?.trim().toLowerCase() || "";
  const selectedSort = params.sort?.trim() || "featured";
  const minPrice = params.minPrice ? Number(params.minPrice) : null;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : null;
  const featuredOnly = params.featured === "true";

  let filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery) ||
      product.shortDescription.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
     (product.category ?? "").toLowerCase().includes(searchQuery);

    const matchesMinPrice = minPrice === null || product.price >= minPrice;
    const matchesMaxPrice = maxPrice === null || product.price <= maxPrice;
    const matchesFeatured = !featuredOnly || Boolean(product.featured);

    return (
      matchesCategory &&
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesFeatured
    );
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "featured":
      default:
        return Number(b.featured ?? false) - Number(a.featured ?? false);
    }
  });

  const pageTitle =
    selectedCategory && searchQuery
      ? `${selectedCategory} / "${params.search}"`
      : selectedCategory
      ? selectedCategory
      : searchQuery
      ? `Search results for "${params.search}"`
      : "All Products";

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 md:px-8">
      <Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    ...(selectedCategory ? [{ label: selectedCategory }] : []),
  ]}
/>
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
          Products
        </p>

        <h1 className="mt-2 text-4xl font-semibold">{pageTitle}</h1>

       <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
  <div className="flex items-center gap-3">
    <MobileFilterDrawer />
    <ProductFilters />
  </div>

  <ProductSort />
</div>

        {(selectedCategory ||
          searchQuery ||
          minPrice !== null ||
          maxPrice !== null ||
          featuredOnly) && (
          <p className="mt-4 text-sm text-slate-500">
            {filteredProducts.length} product
            {filteredProducts.length === 1 ? "" : "s"} found
          </p>
        )}
      </div>
{/* Active filter chips */}
<div className="mb-6">
  <ActiveFilterChips />
</div>


     <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
  <div className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
    <ProductSidebarFilters />
  </div>

        <div>
          {filteredProducts.length > 0 ? (
          <ProductGridWithLoadMore products={filteredProducts} />
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">
                No products found
              </h2>
              <p className="mt-3 text-slate-600">
                Try another search term, change the price range, or browse a
                different category.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}