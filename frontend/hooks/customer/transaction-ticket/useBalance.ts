import { getBalance } from "@/services/global/global.service";
import { useQuery } from "@tanstack/react-query";

const useBalance = () => {
  const { data: dataBalance, isLoading: isLoadingBalance } = useQuery({
    queryKey: ["getBalance"],
    queryFn: () => getBalance().then((res) => res.data),
  });

  return { dataBalance, isLoadingBalance };
};

export default useBalance;
