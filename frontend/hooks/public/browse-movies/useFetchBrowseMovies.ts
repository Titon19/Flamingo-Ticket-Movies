import { useAppSelector } from "@/redux/hooks";
import { getMovieByGenre } from "@/services/public/public.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useFetchBrowseMovies = () => {
  const { id } = useParams();

  const filter = useAppSelector((state) => state.filter.data);

  const { data: BrowseMovies, isLoading } = useQuery({
    queryKey: ["browse-movies", id, filter],
    queryFn: () =>
      getMovieByGenre(id as string, filter).then((res) => res.data),
  });

  return { BrowseMovies, isLoading };
};

export default useFetchBrowseMovies;
