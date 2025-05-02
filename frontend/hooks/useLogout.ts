import { logout } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return { onSubmit, isPending };
};

export default useLogout;
