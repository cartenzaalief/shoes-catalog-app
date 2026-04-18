"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { FilterOptions } from "@/lib/dal/products";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  filterOptions: FilterOptions;
  activeCategorySlug?: string;
  activeSubcategorySlug?: string;
  activeSort: "newest" | "oldest";
};

export default function FilterSidebar({
  filterOptions,
  activeCategorySlug,
  activeSubcategorySlug,
  activeSort,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigateTo = (categorySlug: string, subcategorySlug?: string) => {
    const path = subcategorySlug
      ? `/${categorySlug}/${subcategorySlug}`
      : `/${categorySlug}`;
    router.push(path);
    setMobileOpen(false);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams();
    params.set("sort", value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const filterContent = (
    <div className="space-y-6 px-4">
      {/* Reset */}
      <Button
        variant="outline"
        onClick={() => navigateTo("all-products")}
        className="rounded-none w-full font-normal"
      >
        Atur Ulang
      </Button>

      {/* Sort */}
      <div>
        <h3 className="font-bold mb-3 text-sm uppercase tracking-wide text-primary">
          Urutkan
        </h3>
        <Select value={activeSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full rounded-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="newest">Terbaru</SelectItem>
            <SelectItem value="oldest">Terlama</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-bold mb-3 text-sm uppercase tracking-wide text-primary">
          Tipe
        </h3>
        <ul className="space-y-1">
          {filterOptions.categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => navigateTo(cat.slug)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm transition-colors",
                  activeCategorySlug === cat.slug
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-accent",
                )}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Subcategories — only shown when a category is selected */}
      {activeCategorySlug &&
        activeCategorySlug !== "all-products" &&
        filterOptions.subcategories.length > 0 && (
          <div>
            <h3 className="font-bold mb-3 text-sm uppercase tracking-wide text-primary">
              Kategori
            </h3>
            <ul className="space-y-1">
              {filterOptions.subcategories.map((sub) => (
                <li key={sub.id}>
                  <button
                    onClick={() => navigateTo(activeCategorySlug, sub.slug)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm transition-colors",
                      activeSubcategorySlug === sub.slug
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-foreground hover:bg-accent",
                    )}
                  >
                    {sub.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 shrink-0">{filterContent}</aside>

      {/* Mobile trigger + drawer */}
      <div className="lg:hidden fixed bottom-6 left-6 z-40">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full shadow-lg gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            showCloseButton={false}
            className="w-72 p-0 overflow-y-auto"
          >
            <VisuallyHidden>
              <SheetHeader>
                <SheetTitle></SheetTitle>
              </SheetHeader>
            </VisuallyHidden>
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <h3 className="font-semibold text-sm uppercase tracking-wide">
                Filters
              </h3>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
            <div>{filterContent}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
