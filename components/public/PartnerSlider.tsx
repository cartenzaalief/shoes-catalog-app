"use client";

import { Partner } from "@/types";
import Image from "next/image";

export default function PartnersSlider({ partners }: { partners: Partner[] }) {
  return (
    <section className="w-full mt-14 py-20 bg-gray-50 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">Rekan-rekan Kami</h2>
      </div>

      <div className="relative w-full">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-gray-50 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-gray-50 to-transparent z-10" />

        <div className="flex animate-partner-scroll gap-16 w-max">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-35 opacity-70 hover:opacity-100 transition"
            >
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
