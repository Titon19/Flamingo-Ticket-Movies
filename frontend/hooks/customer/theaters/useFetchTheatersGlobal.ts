import { getTheaters } from "@/services/global/global.service";
import type { Theater } from "@/services/theaters/theater.type";
import { useQuery } from "@tanstack/react-query";

const useFetchTheatersGlobal = () => {
  const { data: theaters, isLoading } = useQuery<
    Pick<Theater, "_id" | "name">[]
  >({
    queryKey: ["theaters"],
    queryFn: () => getTheaters().then((res) => res.data),
  });

  return { theaters, isLoading };
};

export default useFetchTheatersGlobal;
