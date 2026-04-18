"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CarouselSlide, ContentPosition } from "@/types";
import { Button } from "../ui/button";

// Map position enum → Tailwind classes
const positionClasses: Record<ContentPosition, string> = {
  TOP_LEFT: "flex-col justify-start items-start   text-left",
  TOP_CENTER: "flex-col justify-start items-center  text-center",
  TOP_RIGHT: "flex-col justify-start items-end     text-right",
  CENTER_LEFT: "flex-col justify-center items-start  text-left",
  CENTER: "flex-col justify-center items-center text-center",
  CENTER_RIGHT: "flex-col justify-center items-end    text-right",
  BOTTOM_LEFT: "flex-col justify-end items-start     text-left",
  BOTTOM_CENTER: "flex-col justify-end items-center    text-center",
  BOTTOM_RIGHT: "flex-col justify-end items-end       text-right",
};

// Padding so content doesn't hug the edges
const paddingClasses: Record<ContentPosition, string> = {
  TOP_LEFT: "pt-10 pl-8 md:pt-14 md:pl-14",
  TOP_CENTER: "pt-10 px-6 md:pt-14",
  TOP_RIGHT: "pt-10 pr-8 md:pt-14 md:pr-14",
  CENTER_LEFT: "pl-8 md:pl-14",
  CENTER: "px-6",
  CENTER_RIGHT: "pr-8 md:pr-14",
  BOTTOM_LEFT: "pb-14 pl-8 md:pb-16 md:pl-14",
  BOTTOM_CENTER: "pb-14 px-6 md:pb-16",
  BOTTOM_RIGHT: "pb-14 pr-8 md:pb-16 md:pr-14",
};

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
        opts={{ align: "start", containScroll: "trimSnaps", loop: true }}
        className="w-full"
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.play()}
        onPointerDown={() => autoplay.current.stop()}
        onPointerUp={() => autoplay.current.play()}
      >
        <CarouselContent>
          {slides.map((slide) => {
            const position = slide.contentPosition ?? "CENTER";
            return (
              <CarouselItem key={slide.id} className="pl-0">
                <div className="relative w-full aspect-square md:aspect-21/9 overflow-hidden">
                  <picture>
                    {slide.mobileImageUrl && (
                      <source
                        media="(max-width: 768px)"
                        srcSet={slide.mobileImageUrl}
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

                  {(slide.title || slide.subtitle || slide.buttonText) && (
                    <div
                      className={`absolute inset-0 flex w-full h-full bg-linear-to-t from-black/70 via-black/30 to-transparent text-white
    ${positionClasses[position]} ${paddingClasses[position]}`}
                    >
                      <div className="max-w-xl">
                        {slide.title && (
                          <h2 className="text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                            {slide.title}
                          </h2>
                        )}
                        {slide.subtitle && (
                          <p className="mt-2 md:mt-4 text-sm md:text-xl text-white/90">
                            {slide.subtitle}
                          </p>
                        )}
                        {slide.buttonText && (
                          <Button
                            size="lg"
                            className="mt-3 md:mt-6 rounded-none h-8 md:h-10 text-xs md:text-sm"
                            asChild={!!slide.buttonLink}
                          >
                            {slide.buttonLink ? (
                              <Link href={slide.buttonLink}>
                                {slide.buttonText}
                              </Link>
                            ) : (
                              slide.buttonText
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CarouselItem>
            );
          })}
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
