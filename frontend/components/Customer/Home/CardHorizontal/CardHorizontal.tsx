"use client";
import { Film } from "lucide-react";
import CardParent from "./CardParent";
import LoadingHorizontal from "./loadingHorizontal";
import { Movie } from "@/services/global/global.type";
const CardHorizontal = ({
  movies,
  isLoading,
}: {
  movies: Movie[];
  isLoading: boolean;
}) => {
  return (
    <CardParent>
      {isLoading ? (
        <LoadingHorizontal />
      ) : (
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
      )}
    </CardParent>
  );
};

export default CardHorizontal;
