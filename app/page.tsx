import CarouselSection from "@/components/public/CarouselSection";
import NewArrivals from "@/components/public/new-arrivals/NewArrivals";
import PartnersSlider from "@/components/public/PartnerSlider";
import SubcategoryGrid from "@/components/public/subcategory-grid/SubcategoryGrid";
import { getCarouselSlides, getPartners } from "@/lib/dal/homepage";
import { getNewArrivals } from "@/lib/dal/products";
import { getAllSubcategoriesWithCategories } from "@/lib/dal/subcategories";

export default async function Home() {
  const slides = await getCarouselSlides();
  const products = await getNewArrivals();
  const subcategories = await getAllSubcategoriesWithCategories();
  const partners = await getPartners();

  return (
    <div className="w-full">
      <CarouselSection slides={slides} />
      <NewArrivals products={products} />
      <SubcategoryGrid subcategories={subcategories} />
      <PartnersSlider partners={partners} />
    </div>
  );
}
