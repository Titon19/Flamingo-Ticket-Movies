import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import useSignin from "../../../hooks/customer/auth/useSignin";

const signin = () => {
  const { onSubmit, form, isPending } = useSignin();
  return (
    <div className="bg-neutral-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto py-6">
        <Link to="/">
          <h1 className="text-3xl font-bold text-pink-600">Flamingo</h1>
        </Link>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="pb-12">
            <h1 className="text-2xl font-bold text-pink-600">Sign In</h1>
            <p>Welcome back! please sign in to your account in the Flamingo.</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
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
                          className="rounded-full h-12"
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
                        <Input
                          {...field}
                          type="password"
                          className="rounded-full h-12"
                          placeholder="********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  isLoading={isPending}
                  className="w-full rounded-full h-12"
                >
                  Sign In
                </Button>
                <p className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/sign-up" className="text-pink-600">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default signin;
