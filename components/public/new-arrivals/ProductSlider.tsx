"use client";

import { useEffect, useState } from "react";
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
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollNextGroup = () => {
    if (!api) return;
    api.scrollTo(api.selectedScrollSnap() + 1);
  };

  const scrollPrevGroup = () => {
    if (!api) return;
    api.scrollTo(api.selectedScrollSnap() - 1);
  };

  useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };

    updateScrollState();

    api.on("select", updateScrollState);
    api.on("reInit", updateScrollState);
  }, [api]);

  return (
    <div className="w-full">
      <div className="relative group/slider">
        <Button
          variant="outline"
          size="icon"
          hidden={!canPrev}
          onClick={scrollPrevGroup}
          className="absolute hidden md:flex left-4 top-2/5 z-20 h-10 w-10 rounded-none"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          hidden={!canNext}
          onClick={scrollNextGroup}
          className="absolute hidden md:flex right-4 top-2/5 z-20 h-10 w-10 rounded-none"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <Carousel
          setApi={setApi}
          plugins={[WheelGesturesPlugin()]}
          opts={{
            align: "start",
            containScroll: "trimSnaps",
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
