"use client";
import FilterSheet from "@/components/Customer/Home/Browse-Genre/FilterSheet";
import CardParent from "@/components/Customer/Home/CardHorizontal/CardParent";
import LoadingHorizontal from "@/components/Customer/Home/CardHorizontal/loadingHorizontal";

import useFetchBrowseMovies from "@/hooks/public/browse-movies/useFetchBrowseMovies";
import useFetchCitiesPublic from "@/hooks/public/cities/useFetchCitiesPublic";
import useFetchGenresPublic from "@/hooks/public/genres/useFetchGenresPublic";
import useFetchTheatersPublic from "@/hooks/public/theaters/useFetchTheatersPublic";
import { useAppSelector } from "@/redux/hooks";
import { Film } from "lucide-react";
import { useParams } from "next/navigation";

const BrowseGenre = () => {
  const { genres } = useFetchGenresPublic();
  const { cities } = useFetchCitiesPublic();
  const { theaters } = useFetchTheatersPublic();
  const { BrowseMovies, isLoading } = useFetchBrowseMovies();
  const { id } = useParams();

  const genreNameHeader = genres?.find((genre) => genre._id === id)?.name;
  const filter = useAppSelector((state) => state.filter.data);

  const cityNameHeader = cities?.find((city) => city.id === filter?.city)?.name;

  //  Mapping semua theater yang dipilih
  const theaterNameHeader = theaters
    ?.filter((theater) => filter?.theaters?.includes(theater._id))
    .map((theater) => theater.name)
    .join(", ");

  return (
    <>
      <section>
        {genreNameHeader && (
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-center py-4">
            {genreNameHeader} Genre
          </h1>
        )}
        <div className="flex gap-3 my-4 items-center justify-between">
          <FilterSheet />
          <div className="flex gap-3 overflow-x-auto items-center">
            {genreNameHeader && (
              <div className="flex gap-3 md:text-base text-sm">
                <p className="bg-neutral-800 text-white hover:bg-neutral-800 border-2 p-2 px-3 rounded-full">
                  {genreNameHeader}
                </p>
              </div>
            )}
            {cityNameHeader && (
              <div className="flex gap-3 md:text-base text-sm">
                <p className="bg-neutral-800 text-white hover:bg-neutral-800 border-2 p-2 px-3 rounded-full">
                  {cityNameHeader}
                </p>
              </div>
            )}
            {theaterNameHeader && (
              <div className="flex gap-3 md:text-base text-sm">
                <p className="bg-neutral-800 text-white hover:bg-neutral-800 border-2 p-2 px-3 rounded-full">
                  {theaterNameHeader}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <h1 className="text-md md:text-lg lg:text-xl font-bold">
            Showing {BrowseMovies?.filterMovies.length} Filtered Movies
          </h1>
          {isLoading ? (
            <LoadingHorizontal />
          ) : BrowseMovies?.filterMovies.length === 0 ? (
            <p className="text-center font-bold py-8">No Movies Found</p>
          ) : (
            BrowseMovies?.filterMovies.map((movie) => (
              <CardParent.Card key={movie.id} href={`/details/${movie.id}`}>
                <CardParent.Content>
                  <CardParent.Image
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                  />
                  <CardParent.Info>
                    <CardParent.Title>{movie.title}</CardParent.Title>
                    <CardParent.Genre>
                      <Film /> <h6>{movie.genre.name}</h6>
                    </CardParent.Genre>
                  </CardParent.Info>
                </CardParent.Content>
                <CardParent.Rating>4/5⭐</CardParent.Rating>
              </CardParent.Card>
            ))
          )}
        </div>
        <CardParent>
          {isLoading ? (
            <LoadingHorizontal />
          ) : (
            BrowseMovies?.allMovies.map((movie) => (
              <CardParent.Card
                key={movie.id}
                href={`/movie-detail/${movie.id}`}
              >
                <CardParent.Content>
                  <CardParent.Image
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                  />
                  <CardParent.Info>
                    <CardParent.Title>{movie.title}</CardParent.Title>
                    <CardParent.Genre>
                      <Film /> <h6>{movie.genre.name}</h6>
                    </CardParent.Genre>
                  </CardParent.Info>
                </CardParent.Content>
                <CardParent.Rating>4/5⭐</CardParent.Rating>
              </CardParent.Card>
            ))
          )}
        </CardParent>
      </div>
    </>
  );
};

export default BrowseGenre;
