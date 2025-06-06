import { getMovieDetails } from "@/services/global/global.service";
import type { MovieDetails } from "@/services/global/global.type";
import { useQuery } from "@tanstack/react-query";

const useFetchMovieDetails = (MovieId: string) => {
  const { data: movie, isLoading } = useQuery<MovieDetails>({
    queryKey: ["MovieDetails", MovieId],
    queryFn: () =>
      getMovieDetails(MovieId).then((res) => res.data as MovieDetails),
  });
  return { movie, isLoading };
};

export default useFetchMovieDetails;
