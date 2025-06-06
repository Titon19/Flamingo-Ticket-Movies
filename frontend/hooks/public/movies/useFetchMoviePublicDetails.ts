import { getMovieDetails } from "@/services/public/public.service";
import type { MovieDetails } from "@/services/public/public.type";
import { useQuery } from "@tanstack/react-query";

const useFetchMoviePublicDetails = (MovieId: string) => {
  const { data: moviePublic, isLoading: isLoadingMoviePublic } =
    useQuery<MovieDetails>({
      queryKey: ["MoviePublicDetails", MovieId],
      queryFn: () =>
        getMovieDetails(MovieId).then((res) => res.data as MovieDetails),
    });
  return { moviePublic, isLoadingMoviePublic };
};

export default useFetchMoviePublicDetails;
