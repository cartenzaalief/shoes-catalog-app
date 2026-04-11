import CarouselSection from "@/components/public/CarouselSection";
import { getCarouselSlides } from "@/lib/dal/homepage";

export default async function Home() {
  const slides = await getCarouselSlides();

  return (
    <div className="w-full">
      <CarouselSection slides={slides} />
    </div>
  );
}
