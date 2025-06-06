"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchMoviePublicDetails from "@/hooks/public/movies/useFetchMoviePublicDetails";
import { useFetchUserAuth } from "@/hooks/useFetchUserAuth";
import { formatRupiah } from "@/lib/utils";
import { setStep } from "@/redux/features/ticket/ticketSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  ArrowLeft,
  Coffee,
  Home,
  PlayCircle,
  Popcorn,
  TheaterIcon,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const MovieDetails = () => {
  const { id } = useParams();

  const { moviePublic, isLoadingMoviePublic } = useFetchMoviePublicDetails(
    id as string
  );

  const [isChange, setIsChange] = useState<"about" | "theater">("about");

  const handleToggleTab = (tab: "about" | "theater") => {
    setIsChange(tab);
  };

  const dispatch = useAppDispatch();
  const route = useRouter();
  const { data: meAuth } = useFetchUserAuth();
  const handleClick = () => {
    if (meAuth) {
      dispatch(setStep({ step: "THEATER" }));
    } else {
      route.push("/auth/sign-in");
    }
  };

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-8">
        <Button asChild size="icon" className="rounded-full">
          <Link href={"/"}>
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-md md:text-lg lg:text-xl font-bold">
          Movie Details
        </h1>
        <Ticket />
      </div>

      <div>
        {isLoadingMoviePublic ? (
          <>
            <Skeleton className="w-full h-96 mb-8" />

            <div className="mb-8 flex justify-between items-center">
              <Skeleton className="w-72 h-10" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>

            <div className="flex gap-3 mb-8">
              <Skeleton className="w-16 h-8 rouned-full" />
              <Skeleton className="w-16 h-8 rouned-full" />
            </div>

            <Skeleton className="w-full h-72 mb-8" />
            <div className="flex flex-col gap-3">
              <Skeleton className="w-16 h-8" />
              <Skeleton className="w-36 h-24" />
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-96 mb-8">
              <Image
                src={moviePublic?.thumbnailUrl as string}
                alt={moviePublic?.title as string}
                className="w-full h-full object-cover rounded-xl"
                width={500}
                height={500}
              />
            </div>

            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {moviePublic?.title}
              </h1>
              <PlayCircle className="w-8 h-8" />
            </div>

            {/* Handler Toggle */}
            <div className="mb-8 flex gap-3 items-center overflow-x-auto md:text-base text-sm">
              <Button
                onClick={() => handleToggleTab("about")}
                className={`${
                  isChange === "about" ? "bg-pink-600" : "bg-neutral-800"
                } text-white hover:bg-neutral-800 border-2 hover:border-pink-600 transition-colors ease-in-out duration-300 cursor-pointer p-1 px-3  rounded-full`}
              >
                About
              </Button>
              <Button
                onClick={() => handleToggleTab("theater")}
                className={`${
                  isChange === "theater" ? "bg-pink-600" : "bg-neutral-800"
                } text-white hover:bg-neutral-800 border-2 hover:border-pink-600 transition-colors ease-in-out duration-300 cursor-pointer p-1 px-3  rounded-full`}
              >
                Theaters
              </Button>
            </div>

            {/* Contents */}

            {isChange === "about" ? (
              <div className="flex flex-col gap-3">
                <h1 className="text-md md:text-lg lg:text-xl font-bold">
                  Description
                </h1>
                <p className="text-justify">{moviePublic?.description}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <h1 className="text-md md:text-lg lg:text-xl font-bold">
                  Available in Theaters
                </h1>
                <div className="flex flex-wrap gap-4 ">
                  {moviePublic?.theaters?.map((theater) => (
                    <Card
                      key={theater._id}
                      className="p-4 font-bold w-full md:w-fit"
                    >
                      <div className="flex items-center gap-3">
                        <TheaterIcon className="w-8 h-8" />
                        <p className="text-center">{theater.name}</p>
                        <Badge className="text-center flex items-center gap-2">
                          <Home className="w-4 h-4" />
                          {theater.city}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-8 flex gap-3 flex-col">
              <h1 className="text-md md:text-lg lg:text-xl font-bold">Bonus</h1>

              <Card className="p-4 w-fit font-bold">
                <div className="flex items-center gap-3">
                  <Popcorn className="w-8 h-8" />
                  <div className="flex flex-col gap-3">
                    <p className="text-center flex items-center gap-3">
                      {moviePublic?.bonus} Salt
                    </p>
                    <Badge className="text-center flex items-center gap-3 ">
                      <Coffee className="w-4 h-4" />
                      Snack
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-center mt-8">
        <Card className="p-4 w-fit font-bold rounded-full">
          <div className="flex items-center gap-3">
            {moviePublic?.price && (
              <p className="text-2xl font-bold">
                {formatRupiah(moviePublic.price)}
                <span className="text-sm">/Orang</span>
              </p>
            )}
            <Button
              disabled={isLoadingMoviePublic}
              onClick={handleClick}
              className="font-bold cursor-pointer py-5 px-4 rounded-full"
            >
              Buy Ticket
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MovieDetails;
