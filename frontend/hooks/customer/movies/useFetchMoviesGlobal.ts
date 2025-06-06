import { getMovies } from "@/services/global/global.service";
import type { Movie } from "@/services/global/global.type";
import { useQuery } from "@tanstack/react-query";

const useFetchMoviesGlobal = () => {
  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: () => getMovies().then((res) => res.data),
  });

  return { movies, isLoading };
};

export default useFetchMoviesGlobal;
