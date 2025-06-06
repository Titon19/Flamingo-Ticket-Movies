import { login, loginSchema, LoginValue } from "@/services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useSignInSubmit = () => {
  const form = useForm<LoginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", role: "customer" },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: LoginValue) => login(data),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginValue) => {
    try {
      const response = await mutateAsync(data);

      toast.success(
        response.message ||
          "Successfully logged in, redirecting to home page..."
      );
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Sign in failed!, please try again.");
    }
  };
  return { form, onSubmit, isPending };
};

export default useSignInSubmit;
