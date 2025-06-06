import { logout } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";

const useLogout = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      window.location.href = "/";
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
