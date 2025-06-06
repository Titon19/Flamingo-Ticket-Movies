import { getCities } from "@/services/public/public.service";
import type { City } from "@/services/theaters/theater.type";
import { useQuery } from "@tanstack/react-query";

const useFetchCitiesPublic = () => {
  const { data: cities, isLoading } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => getCities().then((res) => res.data),
  });

  return { cities, isLoading };
};

export default useFetchCitiesPublic;
