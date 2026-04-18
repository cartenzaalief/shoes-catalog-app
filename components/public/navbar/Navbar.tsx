"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import NavLinks from "./NavLinks";
import MegaMenu from "./MegaMenu";
import SearchBar from "./SearchBar";
import MobileNav from "./MobileNav";

type NavbarProps = {
  categories: Category[];
};

const extraMenu = [
  { id: "gallery", slug: "gallery", name: "Galeri Produksi" },
  { id: "about", slug: "about", name: "Tentang Kami" },
];

export default function Navbar({ categories }: NavbarProps) {
  const [activeMegaMenu, setActiveMegaMenu] = useState<number | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="max-w-480 mx-auto px-4 md:px-16">
        <div className="flex items-center h-16 gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/jrj-logo.png"
              alt="Logo"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop nav links */}
          <NavLinks
            categories={categories}
            activeMegaMenu={activeMegaMenu}
            onMouseEnter={(id) => setActiveMegaMenu(id)}
            onMouseLeave={() => setActiveMegaMenu(null)}
            extraMenu={extraMenu}
          />

          {/* Desktop search */}
          <SearchBar className="hidden md:block w-64" />

          {/* Mobile nav */}
          <MobileNav categories={categories} extraMenu={extraMenu} />
        </div>
      </div>

      {/* Mega menu */}
      <MegaMenu
        categories={categories}
        activeMegaMenu={activeMegaMenu}
        onMouseEnter={(id) => setActiveMegaMenu(id)}
        onMouseLeave={() => setActiveMegaMenu(null)}
        onClose={() => setActiveMegaMenu(null)}
      />
    </nav>
  );
}
