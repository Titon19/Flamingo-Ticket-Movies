import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import LoginFragment from "../../../components/Fragment/LoginAdmin/index";
import { useForm } from "react-hook-form";
import {
  login,
  loginSchema,
  type LoginData,
} from "../../../services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { useMutation } from "@tanstack/react-query";
import secureLocalStorage from "react-secure-storage";
import { SESSION_KEY } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", role: "admin" },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: LoginData) => login(data),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await mutateAsync(data);
      secureLocalStorage.setItem(SESSION_KEY, response.data);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LoginFragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-3 md:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold text-pink-500">Flamingo</h1>
              <p className="text-muted-foreground text-balance">
                Walacome back🙌 in Flamingo!
              </p>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="youremail@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button isLoading={isPending} type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </LoginFragment>
  );
};

export default AdminLogin;
