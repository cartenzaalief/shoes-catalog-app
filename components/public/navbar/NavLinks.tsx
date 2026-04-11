"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Category } from "@/types";

type NavLinksProps = {
  categories: Category[];
  activeMegaMenu: number | null;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
};

export default function NavLinks({
  categories,
  activeMegaMenu,
  onMouseEnter,
  onMouseLeave,
}: NavLinksProps) {
  return (
    <div className="hidden md:flex items-center flex-1">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="relative"
          onMouseEnter={() => onMouseEnter(cat.id)}
          onMouseLeave={onMouseLeave}
        >
          <Link
            href={`/${cat.slug}`}
            className={`flex items-center gap-1 px-3 py-5 text-sm font-semibold uppercase tracking-wide transition-colors border-b-2 ${
              activeMegaMenu === cat.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.name}
            {cat.subcategories && cat.subcategories.length > 0 && (
              <ChevronDown className="w-3 h-3" />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
