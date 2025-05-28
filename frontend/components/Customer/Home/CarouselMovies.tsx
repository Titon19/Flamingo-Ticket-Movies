"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "../../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

export function CarouselMovies() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const images = [
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DB176BD1488D7E4822256EF1778C124FC17388FC1E7F0F6D89B38AFF5FB001F6/scale?width=1200&aspectRatio=1.78&format=webp",
    "https://i.ytimg.com/vi/mcx97F9xd3s/maxresdefault.jpg",
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full lg:max-w-7xl md:max-w-5xl sm:max-w-4xl max-w-2xl lg:h-[400px] md:h-[350px] h-300px lg:my-12 md:my-8 my-0"
      opts={{ loop: true }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <div className="relative w-full mx-auto flex justify-center">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex lg:h-[350px] md:h-[300px] h-250px items-center justify-center p-0">
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      className="w-full lg:h-[400px] md:h-[350px] h-250px object-cover rounded-lg "
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div>
          <CarouselPrevious className="absolute left-5 -translate-y-1/2 z-10 lg:scale-125 md:scale-110 sm:scale-100 scale-90" />
          <CarouselNext className="absolute right-5 -translate-y-1/2 z-10 lg:scale-125 md:scale-110 sm:scale-100 scale-90" />
        </div>
      </div>
    </Carousel>
  );
}
