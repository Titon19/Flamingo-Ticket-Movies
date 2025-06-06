"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useGenreSubmit from "@/hooks/admin/Genres/useGenreSubmit";
import { SaveIcon } from "lucide-react";

const FormGenre = ({ itemId }: { itemId?: string }) => {
  const { onSubmit, isPending, isLoading, form } = useGenreSubmit({ itemId });
  return (
    <>
      <h1 className="text-xl font-bold">
        {itemId ? "Edit Genre" : "Create Genre"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/2">
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Genre name"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button isPending={isPending} type="submit">
                <SaveIcon className="mr-2 h-4 w-4" />
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default FormGenre;
