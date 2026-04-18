import {
  getProductBySlugWithDetails,
  getSimilarProducts,
} from "@/lib/dal/products";
import ProductImageGallery from "./ProductImageGallery";
import WhatsAppButton from "./WhatsAppButton";
import ProductSlider from "../public/new-arrivals/ProductSlider";

type Product = NonNullable<
  Awaited<ReturnType<typeof getProductBySlugWithDetails>>
>;
type SimilarProducts = Awaited<ReturnType<typeof getSimilarProducts>>;

type Props = {
  product: Product;
  similarProducts: SimilarProducts;
};

export default function ProductDetail({ product, similarProducts }: Props) {
  return (
    <main>
      {/* Product section */}
      <div className="max-w-480 mx-auto px-4 md:px-16 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Left — image gallery */}
          <div className="w-full md:w-1/2">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Right — product info */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {/* Breadcrumb */}
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span>{product.subcategory.category.name}</span>
              <span>/</span>
              <span>{product.subcategory.name}</span>
            </div>

            {/* Title */}
            <div>
              {product.isNewArrival && (
                <span className="text-xs font-medium uppercase tracking-widest text-primary mb-2 block">
                  New Arrival
                </span>
              )}
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Divider */}
            <hr className="border-border" />

            {/* Description */}
            {product.description ? (
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Tidak ada deskripsi untuk produk ini.
              </p>
            )}

            {/* WhatsApp CTA */}
            <div className="mt-auto pt-4">
              <WhatsAppButton productName={product.name} />
            </div>
          </div>
        </div>
      </div>

      {/* Similar products */}
      {similarProducts.length > 0 && (
        <div className="border-t border-border">
          <div className="max-w-480 mx-auto px-4 md:px-16 py-10 md:py-14">
            <h2 className="text-xl font-bold mb-6">Produk Serupa</h2>
            <ProductSlider products={similarProducts} />
          </div>
        </div>
      )}
    </main>
  );
}
