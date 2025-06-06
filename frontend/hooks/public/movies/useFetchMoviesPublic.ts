import { getMovies } from "@/services/public/public.service";
import type { Movie } from "@/services/public/public.type";
import { useQuery } from "@tanstack/react-query";

const useFetchMoviesPublic = () => {
  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: () => getMovies().then((res) => res.data),
  });

  return { movies, isLoading };
};

export default useFetchMoviesPublic;
