import { useLoaderData } from "react-router-dom";
import { Movie } from "../../../services/global/global.type";
import CardParent from "./CardParent";
import { Genre } from "../../../services/genres/genre.type";

const CardVertical = () => {
  const { movies } = useLoaderData() as {
    movies: Movie[];
    genres: Pick<Genre, "_id" | "name">[];
  };
  return (
    <CardParent>
      {movies.map((movie) => (
        <CardParent.Card key={movie.id} to={`/movie-detail/${movie.id}`}>
          <CardParent.Image src={movie.thumbnailUrl} alt={movie.title} />
          <CardParent.Info>
            <CardParent.Genre>{movie.genre.name}</CardParent.Genre>
            <CardParent.Title>{movie.title}</CardParent.Title>
          </CardParent.Info>
        </CardParent.Card>
      ))}
    </CardParent>
  );
};

export default CardVertical;
