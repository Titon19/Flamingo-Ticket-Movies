import { getCities } from "@/services/global/global.service";
import type { City } from "@/services/theaters/theater.type";
import { useQuery } from "@tanstack/react-query";

const useFetchCitiesGlobal = () => {
  const { data: cities, isLoading } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => getCities().then((res) => res.data),
  });

  return { cities, isLoading };
};

export default useFetchCitiesGlobal;
