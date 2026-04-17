import { getProducts } from "@/lib/dal/products";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import PaginationControls from "./PaginationControls";

type Props = {
  categorySlug?: string;
  subcategorySlug?: string;
  sort: "newest" | "oldest";
  page: number;
};

export default async function ProductListPage({
  categorySlug,
  subcategorySlug,
  sort,
  page,
}: Props) {
  const filters = {
    categorySlug: categorySlug === "all-products" ? undefined : categorySlug,
    subcategorySlug,
    sort,
    page,
  };
  const data = await getProducts(filters);

  return (
    <main>
      {/* Header */}
      <div className="bg-primary py-4 flex flex-col items-center justify-center text-center gap-2">
        <div>
          <h1 className="text-2xl font-bold capitalize text-secondary">
            {categorySlug === "all-products"
              ? "Semua Produk"
              : subcategorySlug
                ? data.filterOptions.subcategories.find(
                    (sub) => sub.slug === subcategorySlug,
                  )?.name
                : data.filterOptions.categories.find(
                    (cat) => cat.slug === categorySlug,
                  )?.name}
          </h1>
          <p className="text-sm text-secondary mt-1">
            {data.totalCount} produk ditemukan
          </p>
        </div>
      </div>

      <div className="max-w-480 mx-auto px-4 md:px-16 py-14">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar
            filterOptions={data.filterOptions}
            activeCategorySlug={categorySlug}
            activeSubcategorySlug={subcategorySlug}
            activeSort={sort}
          />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={data.products} />

            {data.totalPages > 1 && (
              <div className="mt-8">
                <PaginationControls
                  currentPage={data.currentPage}
                  totalPages={data.totalPages}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
