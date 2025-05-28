"use client";

import CardHorizontal from "@/components/Customer/Home/CardHorizontal/CardHorizontal";
import CardVertical from "@/components/Customer/Home/CardVertical/CardVertical";
import BrowseGenre from "@/components/Customer/Home/BrowseGenre";
import { CarouselMovies } from "@/components/Customer/Home/CarouselMovies";
import { setStep } from "@/redux/features/ticket/ticketSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import BannerSwiper from "@/components/Customer/Home/SwiperBannerMovies";
import useFetchMoviesGlobal from "@/hooks/customer/movies/useFetchMoviesGlobal";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStep({ step: "DETAIL" }));
  }, []);

  const { movies, isLoading } = useFetchMoviesGlobal();

  return (
    <div className="flex flex-col gap-9 min-h-screen">
      {/* <CarouselMovies /> */}
      <BannerSwiper banners={movies ?? []} isLoading={isLoading} />
      <BrowseGenre />
      <CardHorizontal movies={movies ?? []} isLoading={isLoading} />
      <CardVertical movies={movies ?? []} isLoading={isLoading} />
    </div>
  );
};

export default Home;
