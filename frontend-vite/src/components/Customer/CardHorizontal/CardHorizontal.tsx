import { MapPin, Film } from "lucide-react";
import CardParent from "./CardParent";
import { useLoaderData } from "react-router-dom";
import { Movie } from "../../../services/global/global.type";
import { Genre } from "../../../services/genres/genre.type";

const CardHorizontal = () => {
  const { movies } = useLoaderData() as {
    movies: Movie[];
    genres: Pick<Genre, "_id" | "name">[];
  };
  return (
    <CardParent>
      {movies.map((movie) => (
        <CardParent.Card key={movie.id} to={`/movie-detail/${movie.id}`}>
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
      ))}
    </CardParent>
  );
};

export default CardHorizontal;
