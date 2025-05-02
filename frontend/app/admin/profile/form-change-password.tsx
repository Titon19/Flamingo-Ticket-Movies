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
import useChangePasswordSubmit from "@/hooks/admin/Profile/useChangePasswordSubmit";
import { SaveIcon } from "lucide-react";

export default function ProfilePage() {
  const { form, isPending, onSubmit } = useChangePasswordSubmit();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="grid md:grid-cols-2 grod-cols-1 gap-3 mb-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    width="max"
                    disabled={isPending}
                    placeholder="Current Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    width="max"
                    disabled={isPending}
                    placeholder="New Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmation Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    width="max"
                    disabled={isPending}
                    placeholder="Confirmation Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button isPending={isPending} type="submit" disabled={isPending}>
          <SaveIcon className="mr-2 h-4 w-4" />
          Save Password
        </Button>
      </form>
    </Form>
  );
}
