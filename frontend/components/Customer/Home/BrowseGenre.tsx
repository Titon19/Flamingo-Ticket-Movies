"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchGenresPublic from "@/hooks/public/genres/useFetchGenresPublic";
import Link from "next/link";

const BrowseGenre = () => {
  const { genres, isLoading } = useFetchGenresPublic();

  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-md md:text-lg lg:text-xl font-bold">Browse Genre</h1>
      <div className="flex gap-3 items-center overflow-x-auto md:text-base text-sm">
        <Button className="bg-pink-600 text-black border-2 hover:bg-pink-600 border-pink-600 hover:border-pink-600 transition-colors ease-in-out duration-300 cursor-pointer p-2 px-3 rounded-full">
          All
        </Button>

        {isLoading ? (
          <Skeleton className="py-4 px-8 rounded-full" />
        ) : (
          genres?.map((genre) => (
            <Link
              href={`/browse-movies/${genre._id}`}
              key={genre._id}
              className="bg-neutral-800 text-white hover:bg-neutral-800 border-2 hover:border-pink-600 transition-colors ease-in-out duration-300 cursor-pointer p-1 px-3  rounded-full"
            >
              {genre.name}
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default BrowseGenre;
