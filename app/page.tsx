import CarouselSection from "@/components/public/CarouselSection";
import NewArrivals from "@/components/public/new-arrivals/NewArrivals";
import SubcategoryGrid from "@/components/public/subcategory-grid/SubcategoryGrid";
import { getCarouselSlides } from "@/lib/dal/homepage";
import { getNewArrivals } from "@/lib/dal/products";
import { getAllSubcategoriesWithCategories } from "@/lib/dal/subcategories";

export default async function Home() {
  const slides = await getCarouselSlides();
  const products = await getNewArrivals();
  const subcategories = await getAllSubcategoriesWithCategories();

  return (
    <div className="w-full">
      <CarouselSection slides={slides} />
      <NewArrivals products={products} />
      <SubcategoryGrid subcategories={subcategories} />
    </div>
  );
}
