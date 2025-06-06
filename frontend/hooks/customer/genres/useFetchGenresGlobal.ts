import type { Genre } from "@/services/genres/genre.type";
import { getGenres } from "@/services/global/global.service";
import { useQuery } from "@tanstack/react-query";

const useFetchGenresGlobal = () => {
  const { data: genres, isLoading } = useQuery<Pick<Genre, "_id" | "name">[]>({
    queryKey: ["genres"],
    queryFn: () => getGenres().then((res) => res.data),
  });
  return { genres, isLoading };
};

export default useFetchGenresGlobal;
