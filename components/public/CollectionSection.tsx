import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Category } from "@/types";

export default function CollectionsSection({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="max-w-480 mx-auto px-4 md:px-16 pt-14">
      {/* MOBILE ACCORDION */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="w-full">
          {categories.map((category) => (
            <AccordionItem key={category.id} value={category.slug}>
              <AccordionTrigger className="text-lg font-bold uppercase">
                {category.name}
              </AccordionTrigger>

              <AccordionContent>
                <ul className="space-y-4 pt-2">
                  {category.subcategories &&
                    category.subcategories.length > 0 &&
                    category.subcategories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/products/${category.slug}/${category.slug}`}
                          className="text-gray-700 hover:text-black transition hover:translate-x-1 inline-block"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-16">
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-6">
              {category.name}
            </h3>

            <ul className="space-y-4">
              {category.subcategories &&
                category.subcategories.length > 0 &&
                category.subcategories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/products/${category.slug}/${category.slug}`}
                      className="text-gray-700 hover:text-black transition hover:translate-x-1 inline-block"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
