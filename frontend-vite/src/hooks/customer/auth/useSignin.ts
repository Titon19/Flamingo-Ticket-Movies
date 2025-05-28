import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  login,
  LoginData,
  loginSchema,
} from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import secureLocalStorage from "react-secure-storage";
import { SESSION_KEY } from "../../../lib/utils";

const useSignin = () => {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", role: "customer" },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: LoginData) => login(data),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await mutateAsync(data);
      secureLocalStorage.setItem(SESSION_KEY, response.data);
      navigate("/");
      toast.success("Login success!");
    } catch (error) {
      console.log(error);
      toast.error("Login failed!, please try again.");
    }
  };

  return { onSubmit, form, isPending };
};

export default useSignin;
