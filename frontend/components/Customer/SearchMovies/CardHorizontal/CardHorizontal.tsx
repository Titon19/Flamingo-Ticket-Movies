"use client";
import { Film } from "lucide-react";
import CardParent from "./CardParent";
import LoadingHorizontal from "./loadingHorizontal";
import { Movie } from "@/services/global/global.type";
import { CommandEmpty } from "@/components/ui/command";
const CardHorizontal = ({
  movies,
  isLoading,
  onClick,
}: {
  movies: Movie[];
  isLoading: boolean;
  onClick: () => void;
}) => {
  return (
    <CardParent amount={movies.length} onClick={onClick}>
      {isLoading ? (
        <LoadingHorizontal />
      ) : movies ? (
        movies?.map((movie) => (
          <CardParent.Card key={movie.id} href={`/details/${movie.id}`}>
            <CardParent.Content>
              <CardParent.Image src={movie.thumbnailUrl} alt={movie.title} />
              <CardParent.Info>
                <CardParent.Title>{movie.title}</CardParent.Title>
                <CardParent.Genre>
                  <Film /> <p>{movie.genre.name}</p>
                </CardParent.Genre>
              </CardParent.Info>
            </CardParent.Content>
            <CardParent.Rating>4/5⭐</CardParent.Rating>
          </CardParent.Card>
        ))
      ) : (
        <CommandEmpty>No movies found.</CommandEmpty>
      )}
    </CardParent>
  );
};

export default CardHorizontal;

// if (loading) {
//   loading
// }else if(movies) {
//   data ada
// }else{
//   kosong
// }
