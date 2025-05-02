import { login, loginSchema, LoginValue } from "@/services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useLoginAdmin = () => {
  const form = useForm<LoginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", role: "admin" },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: LoginValue) => login(data),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginValue) => {
    try {
      const response = await mutateAsync(data);
      if (response.status === "Success") {
        toast.success(
          response.message ||
            "Successfully logged in, redirecting to home page..."
        );
      } else {
        toast.error(response.message || "Sign in failed!, please try again.");
      }
      router.push("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Sign in failed!, please try again.");
    }
  };
  return { form, onSubmit, isPending };
};

export default useLoginAdmin;
