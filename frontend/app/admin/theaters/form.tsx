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
import useTheaterSubmit from "@/hooks/admin/Theaters/useTheaterSubmit";
import { SaveIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormTheater = ({ itemId }: { itemId?: string }) => {
  const {
    onSubmit,
    isPending,
    isLoading,
    form,

    cities,
    citySelectorLoading,
  } = useTheaterSubmit({ itemId });
  return (
    <>
      <h1 className="text-xl font-bold">
        {itemId ? "Edit Theater" : "Create Theater"}
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
                      disabled={isLoading}
                      placeholder="Nama theater"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={citySelectorLoading}>
                        <SelectValue placeholder="--Pilih Kota--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities?.map((city) => (
                        <SelectItem key={city.id} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default FormTheater;
