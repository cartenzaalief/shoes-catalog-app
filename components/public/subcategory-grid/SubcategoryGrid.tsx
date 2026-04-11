import { Subcategory } from "@/types";
import SubcategoryCard from "./SubcategoryCard";

export default function SubcategoryGrid({
  subcategories,
}: {
  subcategories: Subcategory[];
}) {
  return (
    <section className="max-w-480 mx-auto px-4 md:px-16 pt-14">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Berdasarkan Kategori
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subcategories.map((subcategory) => (
          <SubcategoryCard key={subcategory.id} subcategory={subcategory} />
        ))}
      </div>
    </section>
  );
}
