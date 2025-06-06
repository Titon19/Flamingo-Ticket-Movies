// components/BannerSwiper.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "@/services/global/global.type";
import { Badge } from "@/components/ui/badge";

const BannerSwiper = ({
  banners,
  isLoading,
}: {
  banners: Movie[];
  isLoading: boolean;
}) => {
  return isLoading ? (
    <Skeleton className="w-full h-[200px] sm:h-[300px] md:h-[600px]" />
  ) : (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[600px] rounded-xl overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-full"
      >
        {banners.map((item, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Gambar */}
            <img
              src={item.bannerUrl}
              alt={item.title || `Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neutral-950 to-transparent z-10 pointer-events-none" />

            {/* Teks */}
            <div className="absolute bottom-0 left-0 z-20 p-3 sm:p-6 md:p-10 flex flex-col items-start justify-start gap-3 text-white max-w-[90%] sm:max-w-[80%] lg:max-w-[60%]">
              <h2 className="font-bold leading-tight text-[clamp(1rem,4vw,3rem)]">
                {item.title}
              </h2>
              <Badge
                variant={"outline"}
                className="bg-pink-600 font-medium text-[clamp(0.6rem,1.2vw,1rem)]"
              >
                {item.genre.name}
              </Badge>
              <p className="hidden sm:block text-[clamp(0.7rem,1.5vw,1.125rem)]">
                {item.description}
              </p>

              <Badge className="font-medium text-[clamp(0.6rem,1.2vw,1rem)]">
                8.5/10
              </Badge>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSwiper;
