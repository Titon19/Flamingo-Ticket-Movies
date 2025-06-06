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
import useLoginAdmin from "@/hooks/admin/auth/useLoginAdmin";

const AdminLogin = () => {
  const { form, onSubmit, isPending } = useLoginAdmin();

  return (
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
                    className="rounded-full"
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
                    className="rounded-full"
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
            className="w-full rounded-full"
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminLogin;
