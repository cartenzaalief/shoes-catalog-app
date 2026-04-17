import ProductListPage from "@/components/products/ProductListPage";

type Props = {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
};

export default async function SubcategoryPage({ params, searchParams }: Props) {
  const { category, subcategory } = await params;
  const { sort, page } = await searchParams;

  return (
    <ProductListPage
      categorySlug={category}
      subcategorySlug={subcategory}
      sort={(sort as "newest" | "oldest") ?? "newest"}
      page={Number(page) || 1}
    />
  );
}
