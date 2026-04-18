"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Search, X } from "lucide-react";
import { SearchResults } from "@/types";
import SearchDropdown from "./SearchDropdown";

type SearchBarProps = {
  className?: string;
};

export default function SearchBar({ className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    subcategories: [],
    products: [],
  });
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 2) {
      setResults({ subcategories: [], products: [] });
      setOpen(false);
      return;
    }
    setSearching(true);
    setOpen(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setResults(data);
      } catch {
        setResults({ subcategories: [], products: [] });
      } finally {
        setSearching(false);
      }
    }, 300);
  }, []);

  const handleNavigate = () => {
    setOpen(false);
    setQuery("");
    setResults({ subcategories: [], products: [] });
  };

  const handleClear = () => {
    setQuery("");
    setResults({ subcategories: [], products: [] });
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-center border-b border-input focus-within:border-foreground transition-colors pb-1.5 gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder="Mencari"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
        />
        {query ? (
          <button
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </div>

      {open && query.length >= 2 && (
        <SearchDropdown
          query={query}
          results={results}
          searching={searching}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
