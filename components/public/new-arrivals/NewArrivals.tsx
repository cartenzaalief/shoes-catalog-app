import { Product } from "@/types";
import ProductSlider from "./ProductSlider";

export default function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section className="max-w-480 mx-auto px-4 md:px-16 pt-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Model Terbaru
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
