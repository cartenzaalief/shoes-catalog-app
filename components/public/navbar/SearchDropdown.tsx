import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SearchResults } from "./types";

type SearchDropdownProps = {
  query: string;
  results: SearchResults;
  searching: boolean;
  onNavigate: () => void;
};

export default function SearchDropdown({
  query,
  results,
  searching,
  onNavigate,
}: SearchDropdownProps) {
  const hasResults =
    results.subcategories.length > 0 || results.products.length > 0;
  const totalProducts = results.products.length;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-t-0 border-border shadow-lg z-50 max-h-[480px] overflow-y-auto">
      {searching && (
        <div className="px-6 py-4 text-sm text-muted-foreground">
          Mencari...
        </div>
      )}

      {!searching && !hasResults && (
        <div className="px-6 py-4 text-sm text-muted-foreground">
          Tidak ditemukan "{query}"
        </div>
      )}

      {!searching && results.subcategories.length > 0 && (
        <div className="px-6 pt-5 pb-3">
          <p className="text-xs font-bold uppercase tracking-widest mb-3">
            Categories
          </p>
          <div className="space-y-1">
            {results.subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/${sub.category.slug}/${sub.slug}`}
                onClick={onNavigate}
                className="flex items-center gap-2 py-1.5 text-sm text-foreground hover:text-black"
              >
                <Search className="w-3 h-3 text-muted-foreground shrink-0" />
                <span>{sub.name}</span>
                <span className="text-muted-foreground text-xs">
                  in {sub.category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!searching &&
        results.subcategories.length > 0 &&
        results.products.length > 0 && <Separator />}

      {!searching && results.products.length > 0 && (
        <div className="px-6 pt-5 pb-2">
          <p className="text-xs font-bold uppercase tracking-widest mb-4">
            Products
          </p>
          <div className="divide-y divide-border">
            {results.products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={onNavigate}
                className="flex items-center gap-5 py-4 hover:bg-muted/40 -mx-2 px-2 transition-colors"
              >
                <div className="w-20 h-16 shrink-0 bg-muted rounded overflow-hidden">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt ?? product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-medium text-foreground leading-snug">
                    {product.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {product.subcategory.category.slug.toUpperCase()} ·{" "}
                    {product.subcategory.slug.toUpperCase()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!searching && totalProducts > 0 && (
        <>
          <Separator />
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={onNavigate}
            className="flex items-center justify-center gap-2 py-4 text-sm font-medium hover:bg-muted/40 transition-colors w-full"
          >
            Lihat semua {totalProducts} Produk
            <span>→</span>
          </Link>
        </>
      )}
    </div>
  );
}
