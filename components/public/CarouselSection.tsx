"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CarouselSlide } from "@/types";
import { Button } from "../ui/button";

type CarouselSectionProps = {
  slides: CarouselSlide[];
};

export default function CarouselSection({ slides }: CarouselSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    }),
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full">
      <Carousel
        setApi={setApi}
        plugins={[autoplay.current, WheelGesturesPlugin()]}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          loop: true,
        }}
        className="w-full"
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.play()}
        onPointerDown={() => autoplay.current.stop()}
        onPointerUp={() => autoplay.current.play()}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative w-full aspect-square md:aspect-21/9 overflow-hidden">
                <picture>
                  {slide.mobileImageUrl && (
                    <source
                      media="(max-width: 768px)"
                      srcSet={slide.mobileImageUrl ?? slide.desktopImageUrl}
                    />
                  )}

                  <Image
                    src={slide.desktopImageUrl}
                    alt={slide.title ?? "Carousel image"}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover"
                  />
                </picture>

                {(slide.title || slide.subtitle) && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 bg-linear-to-t from-black/70 via-black/30 to-transparent">
                    {slide.title && (
                      <h2 className="text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        {slide.title}
                      </h2>
                    )}

                    {slide.subtitle && (
                      <p className="md:mt-4 max-w-xl text-sm md:text-xl text-white/90">
                        {slide.subtitle}
                      </p>
                    )}

                    {slide.buttonText && (
                      <Button
                        size="lg"
                        className="mt-3 md:mt-6 rounded-none h-8 md:h-10 text-xs md:text-sm"
                      >
                        {slide.buttonText}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Pagination dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-primary w-8"
                  : "bg-primary/40 w-2.5 hover:bg-primary"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
