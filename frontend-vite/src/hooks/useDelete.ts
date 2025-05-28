import { useMutation } from "@tanstack/react-query";
import { useRevalidator } from "react-router-dom";
import { toast } from "sonner";

type DeleteTypes<T> = () => Promise<T>;

const useDelete = <T>(deleteFn: DeleteTypes<T>, onSuccess?: () => void) => {
  const { mutateAsync } = useMutation<T, Error>({
    mutationFn: deleteFn,
  });

  const revalidator = useRevalidator();
  const handleDelete = async () => {
    try {
      await mutateAsync();
      revalidator.revalidate();
      toast.success("Berhasil menghapus data");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus data");
    }
  };
  return { handleDelete };
};

export default useDelete;
