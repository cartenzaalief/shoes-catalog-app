"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { Category } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SearchBar from "./SearchBar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type MobileNavProps = {
  categories: Category[];
};

export default function MobileNav({ categories }: MobileNavProps) {
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<number | null>(
    null,
  );

  return (
    <div className="md:hidden flex justify-end items-center gap-1 ml-auto">
      {/* Mobile search */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" showCloseButton={false} className="p-4 pt-6">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
          </VisuallyHidden>
          <SearchBar className="w-full" />
        </SheetContent>
      </Sheet>

      {/* Mobile menu */}
      <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" showCloseButton={false} className="w-72 p-0">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
          </VisuallyHidden>
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <Link href="/" onClick={() => setMobileSheetOpen(false)}>
              <Image
                src="/jrj-logo.png"
                alt="Logo"
                width={100}
                height={32}
                className="object-contain"
              />
            </Link>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>

          <div className="overflow-y-auto">
            {categories.map((cat, idx) => (
              <div key={cat.id}>
                <div className="flex items-center justify-between px-4 py-3">
                  <Link
                    href={`/${cat.slug}`}
                    className="text-sm font-semibold uppercase tracking-wide"
                    onClick={() => setMobileSheetOpen(false)}
                  >
                    {cat.name}
                  </Link>
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        setOpenMobileCategory((p) =>
                          p === cat.id ? null : cat.id,
                        )
                      }
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openMobileCategory === cat.id ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  )}
                </div>

                {openMobileCategory === cat.id && cat.subcategories && (
                  <div className="bg-muted/40 pb-2">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/${cat.slug}/${sub.slug}`}
                        className="block px-8 py-2 text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileSheetOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}

                {idx < categories.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
