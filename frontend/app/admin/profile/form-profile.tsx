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
import useChangeProfileSubmit from "@/hooks/admin/Profile/useChangeProfileSubmit";
import { ImageIcon, SaveIcon, Trash2Icon } from "lucide-react";

export default function ProfilePage() {
  const {
    form,
    isPending,
    onSubmit,
    handlePhotoChange,
    preview,
    setPreview,
    isLoading,
  } = useChangeProfileSubmit();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="photo"
          render={() => (
            <FormItem className="mb-4">
              <div className="flex items-center gap-3">
                {preview ? (
                  <div>
                    <img
                      src={preview}
                      alt={"photo-profile"}
                      className="w-16 h-16 object-cover rounded-full border-2 border-neutral-100 border-dashed"
                    />
                  </div>
                ) : (
                  <FormLabel className="cursor-pointer p-8 flex justify-center w-6 h-6 bg-neutral-900 text-neutral-500 rounded-full border-2 border-neutral-100 border-dashed">
                    <div className="flex items-center">
                      +<ImageIcon className="w-5 h-5" />
                    </div>
                  </FormLabel>
                )}
                <Button
                  type="button"
                  className="rounded-full"
                  disabled={isLoading}
                  onClick={() => {
                    form.setValue("photo", null);
                    setPreview(null);
                  }}
                >
                  <Trash2Icon className="w-4 h-4" />
                  Delete
                </Button>
              </div>
              <FormControl>
                <Input
                  onChange={handlePhotoChange}
                  type="file"
                  className="rounded-full h-12 hidden"
                  disabled={isLoading}
                  placeholder="youremail@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 grod-cols-1 gap-3 mb-4">
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
                    width="max"
                    disabled={isLoading}
                    placeholder="Fullname"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    width="max"
                    disabled={isLoading}
                    placeholder="email@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button isPending={isPending} type="submit" disabled={isLoading}>
          <SaveIcon className="mr-2 h-4 w-4" />
          Save
        </Button>
      </form>
    </Form>
  );
}
