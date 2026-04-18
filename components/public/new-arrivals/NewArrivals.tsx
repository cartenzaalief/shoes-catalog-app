import { Product } from "@/types";
import ProductSlider from "./ProductSlider";

export default function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section className="max-w-480 mx-auto px-4 md:px-16 pt-14">
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <h2 className="text-lg md:text-3xl font-bold text-secondary">
          NEW PROJECT
        </h2>

        <a
          href="/all-products"
          className="text-sm font-medium text-primary hover:underline"
        >
          Lihat Semua
        </a>
      </div>

      <ProductSlider products={products} />
    </section>
  );
}
