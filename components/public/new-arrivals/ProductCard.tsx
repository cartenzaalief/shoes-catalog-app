"use client";

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.images[0]?.url}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3">
        <p className="text-sm text-gray-500">{product.subcategory?.name}</p>
        <p className="font-medium">{product.name}</p>
      </div>
    </Link>
  );
}
