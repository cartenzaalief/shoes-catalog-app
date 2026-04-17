import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const href = `/${product?.subcategory?.category?.slug}/${product?.subcategory?.slug}/${product.slug}`;

  return (
    <Link href={href} className="group block">
      <div className="aspect-square relative overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt ?? product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
      </div>
      <div className="mt-2 px-1">
        <p className="text-xs text-muted-foreground capitalize">
          {product?.subcategory?.name}
        </p>
        <h3 className="font-medium text-sm text-primary leading-snug mt-0.5 group-hover:underline line-clamp-2">
          {product.name}
        </h3>
      </div>
    </Link>
  );
}
