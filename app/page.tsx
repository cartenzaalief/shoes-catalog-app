import CarouselSection from "@/components/public/CarouselSection";
import NewArrivals from "@/components/public/new-arrivals/NewArrivals";
import { getCarouselSlides } from "@/lib/dal/homepage";
import { getNewArrivals } from "@/lib/dal/products";

export default async function Home() {
  const slides = await getCarouselSlides();
  const products = await getNewArrivals();

  return (
    <div className="w-full">
      <CarouselSection slides={slides} />
      <NewArrivals products={products} />
    </div>
  );
}
