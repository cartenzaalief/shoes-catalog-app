"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ProductImage = {
  id: number;
  url: string;
  alt: string | null;
};

type Props = {
  images: ProductImage[];
  productName: string;
};

export default function ProductImageGallery({ images, productName }: Props) {
  console.log("Rendering ProductImageGallery with images:", images);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleSetApi = useCallback((api: CarouselApi) => {
    if (!api) return;
    setApi(api);
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, []);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
    setCurrent(index);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-muted flex items-center justify-center text-muted-foreground text-sm rounded-md">
        Tidak ada gambar
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main carousel */}
      <Carousel
        setApi={handleSetApi}
        plugins={[WheelGesturesPlugin()]}
        opts={{ align: "start", loop: true, dragFree: false }}
        className="w-full select-none"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={image.id} className="pl-0">
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Image
                  src={image.url}
                  alt={image.alt ?? `${productName} - gambar ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnails — only show if more than 1 image */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => scrollTo(index)}
              className={cn(
                "relative shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden border-2 transition-all duration-200",
                current === index
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80",
              )}
            >
              <Image
                src={image.url}
                alt={image.alt ?? `thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
