import { getProducts } from "@/lib/dal/products";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import PaginationControls from "./PaginationControls";

type Props = {
  categorySlug?: string;
  subcategorySlug?: string;
  sort: "newest" | "oldest";
  page: number;
  search?: string;
};

export default async function ProductListPage({
  categorySlug,
  subcategorySlug,
  sort,
  page,
  search,
}: Props) {
  const filters = {
    categorySlug: categorySlug === "all-products" ? undefined : categorySlug,
    subcategorySlug,
    sort,
    page,
    search,
  };
  const data = await getProducts(filters);

  // Resolve header title
  const headerTitle = search
    ? `Hasil pencarian: "${search}"`
    : categorySlug === "all-products"
      ? "Semua Produk"
      : subcategorySlug
        ? `${
            data.filterOptions.categories.find((c) => c.slug === categorySlug)
              ?.name
          } / ${
            data.filterOptions.subcategories.find(
              (s) => s.slug === subcategorySlug,
            )?.name
          }`
        : data.filterOptions.categories.find((c) => c.slug === categorySlug)
            ?.name;

  return (
    <main>
      <div className="bg-primary py-4 flex flex-col items-center justify-center text-center gap-2">
        <h1 className="text-2xl font-bold capitalize text-primary-foreground">
          {headerTitle}
        </h1>
        <p className="text-sm text-primary-foreground mt-1">
          {data.totalCount} produk ditemukan
        </p>
      </div>

      <div className="max-w-480 mx-auto px-4 md:px-16 py-14">
        <div className="flex gap-8">
          <FilterSidebar
            filterOptions={data.filterOptions}
            activeCategorySlug={categorySlug}
            activeSubcategorySlug={subcategorySlug}
            activeSort={sort}
            activeSearch={search} // 👈 pass search down
          />

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
