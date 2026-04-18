import Link from "next/link";
import { Category } from "@/types";

type MegaMenuProps = {
  categories: Category[];
  activeMegaMenu: number | null;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  onClose: () => void;
};

export default function MegaMenu({
  categories,
  activeMegaMenu,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaMenuProps) {
  return (
    <>
      {categories.map((cat) =>
        cat.subcategories && cat.subcategories.length > 0 ? (
          <div
            key={cat.id}
            className={`hidden md:block absolute left-0 right-0 bg-primary border-t shadow-lg z-40 transition-all duration-150 ${
              activeMegaMenu === cat.id
                ? "opacity-100 visible"
                : "opacity-0 invisible pointer-events-none"
            }`}
            onMouseEnter={() => onMouseEnter(cat.id)}
            onMouseLeave={onMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-8 py-8">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground mb-4 underline underline-offset-4">
                {cat.name}
              </p>
              <div className="grid grid-cols-4 gap-4">
                {cat.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/${cat.slug}/${sub.slug}`}
                    onClick={onClose}
                    className="text-sm font-medium text-primary-foreground hover:underline underline-offset-4"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null,
      )}
    </>
  );
}
