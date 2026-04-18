import { notFound } from "next/navigation";
import {
  getProductBySlugWithDetails,
  getSimilarProducts,
} from "@/lib/dal/products";
import ProductDetail from "@/components/products/ProductDetail";

type Props = {
  params: Promise<{ category: string; subcategory: string; product: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { product: productSlug } = await params;

  const product = await getProductBySlugWithDetails(productSlug);
  if (!product) notFound();

  const similarProducts = await getSimilarProducts(
    product.subcategoryId,
    product.id,
  );

  return <ProductDetail product={product} similarProducts={similarProducts} />;
}
