import {
  changePassword,
  changePasswordSchema,
  changePasswordValue,
} from "@/services/changePassword/change-password.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useChangePasswordSubmit = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: changePasswordValue) => changePassword(data),
    onSuccess: () => {
      form.reset();
    },
  });

  const onSubmit = async (data: changePasswordValue) => {
    try {
      const response = await mutateAsync(data);

      if (response.status === "Success") {
        toast.success(response.message || "Password changed successfully");
      } else {
        toast.error(response.message || "Password change failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return { form, onSubmit, isPending };
};

export default useChangePasswordSubmit;
