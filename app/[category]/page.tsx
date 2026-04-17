import ProductListPage from "@/components/products/ProductListPage";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { sort, page } = await searchParams;

  return (
    <ProductListPage
      categorySlug={category}
      sort={(sort as "newest" | "oldest") ?? "newest"}
      page={Number(page) || 1}
    />
  );
}
