import { Subcategory } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function SubcategoryCard({
  subcategory,
}: {
  subcategory: Subcategory;
}) {
  return (
    <Link
      href={`/${subcategory.category?.slug}/${subcategory.slug}`}
      className="group relative block overflow-hidden transform transition duration-300"
    >
      <div className="relative aspect-video w-full">
        <Image
          src={subcategory.imageUrl ?? "/placeholder.jpg"}
          alt={subcategory.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        {/* text */}
        <div className="absolute bottom-6 left-6 text-white">
          <h6 className="text-sm">{subcategory.category?.name}</h6>
          <h3 className="text-2xl font-semibold">{subcategory.name}</h3>

          <span className="text-sm opacity-90 mt-1 block">
            Lihat Sekarang →
          </span>
        </div>
      </div>
    </Link>
  );
}
