import { Subcategory } from "@/types";
import SubcategoryCard from "./SubcategoryCard";

export default function SubcategoryGrid({
  subcategories,
}: {
  subcategories: Subcategory[];
}) {
  return (
    <section className="max-w-480 mx-auto px-4 md:px-16 pt-14">
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <h2 className="text-lg md:text-3xl font-bold text-secondary">
          BERDASARKAN KATEGORI
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {subcategories.map((subcategory) => (
          <SubcategoryCard key={subcategory.id} subcategory={subcategory} />
        ))}
      </div>
    </section>
  );
}
