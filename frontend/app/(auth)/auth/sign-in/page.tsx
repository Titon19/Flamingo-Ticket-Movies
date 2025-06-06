"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSignInSubmit from "@/hooks/customer/auth/useSignInSubmit";
import Link from "next/link";

const SignInPage = () => {
  const { form, onSubmit, isPending } = useSignInSubmit();

  return (
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
            isPending={isPending}
            className="w-full rounded-full h-12"
          >
            Sign In
          </Button>
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="text-pink-600">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default SignInPage;
