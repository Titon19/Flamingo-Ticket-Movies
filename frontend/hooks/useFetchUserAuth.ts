import { me } from "@/services/auth/auth.service";
import { ProfileResponse } from "@/services/profile/profile.type";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserAuth = (): {
  data:
    | Pick<ProfileResponse, "name" | "email" | "photoUrl" | "photo">
    | undefined;
  isLoading: boolean;
} => {
  const { data: meAuth, isLoading } = useQuery({
    queryKey: ["meAuth"],
    queryFn: async () => {
      const { data } = await me();
      return data;
    },
  });

  return { data: meAuth, isLoading };
};
