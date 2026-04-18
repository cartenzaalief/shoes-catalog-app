"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Category } from "@/types";

type NavLinksProps = {
  categories: Category[];
  activeMegaMenu: number | null;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
  extraMenu: { slug: string; name: string }[];
};

export default function NavLinks({
  categories,
  activeMegaMenu,
  onMouseEnter,
  onMouseLeave,
  extraMenu,
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
                ? "border-primary text-primary"
                : "border-transparent text-foreground hover:text-primary"
            }`}
          >
            {cat.name}
            {cat.subcategories && cat.subcategories.length > 0 && (
              <ChevronDown className="w-3 h-3" />
            )}
          </Link>
        </div>
      ))}
      {extraMenu.map((menu) => (
        <div key={menu.slug} className="relative">
          <Link
            href={`/${menu.slug}`}
            className={`flex items-center gap-1 px-3 py-5 text-sm font-semibold uppercase tracking-wide transition-colors border-b-2 border-transparent hover:border-primary text-secondary hover:text-primary`}
          >
            {menu.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
