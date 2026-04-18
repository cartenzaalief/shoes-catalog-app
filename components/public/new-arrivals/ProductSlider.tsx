"use client";

import { useState } from "react";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import ProductCard from "../../products/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";
import { Product } from "@/types";

export default function ProductSlider({ products }: { products: Product[] }) {
  const [api, setApi] = useState<CarouselApi>();

  const scrollNextGroup = () => {
    if (!api) return;

    const currentIndex = api.selectedScrollSnap();
    const lastIndex = api.scrollSnapList().length - 1;

    if (currentIndex >= lastIndex) {
      api.scrollTo(0);
    } else {
      api.scrollTo(currentIndex + 1);
    }
  };

  const scrollPrevGroup = () => {
    if (!api) return;

    const currentIndex = api.selectedScrollSnap();
    const lastIndex = api.scrollSnapList().length - 1;

    if (currentIndex <= 0) {
      api.scrollTo(lastIndex);
    } else {
      api.scrollTo(currentIndex - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="relative group/slider">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrevGroup}
          className="absolute left-4 top-2/5 z-20 hidden h-10 w-10 rounded-none md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={scrollNextGroup}
          className="absolute right-4 top-2/5 z-20 hidden h-10 w-10 rounded-none md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <Carousel
          setApi={setApi}
          plugins={[WheelGesturesPlugin()]}
          opts={{
            align: "start",
            containScroll: "trimSnaps",
            loop: true,
            dragFree: true,
          }}
          className="w-full select-none"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-[50%] md:basis-[33.333%] lg:basis-[25%]"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
