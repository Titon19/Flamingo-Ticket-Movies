"use client";
import CardParent from "./CardParent";
import { Movie } from "@/services/global/global.type";

const CardVertical = ({
  movies,
  isLoading,
}: {
  movies: Movie[];
  isLoading: boolean;
}) => {
  return (
    <CardParent>
      {isLoading ? (
        <CardParent.Skeleton />
      ) : (
        movies?.map((movie) => (
          <CardParent.Card key={movie.id} href={`/details/${movie.id}`}>
            <CardParent.Image src={movie.thumbnailUrl} alt={movie.title} />
            <CardParent.Info>
              <CardParent.Genre>{movie.genre.name}</CardParent.Genre>
              <CardParent.Title>{movie.title}</CardParent.Title>
            </CardParent.Info>
          </CardParent.Card>
        ))
      )}
    </CardParent>
  );
};

export default CardVertical;
