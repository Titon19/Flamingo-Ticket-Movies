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
import { ImageIcon, Trash2Icon } from "lucide-react";
import useSignup from "../../../hooks/customer/auth/useSignup";

const signup = () => {
  const { onSubmit, form, handlePhotoChange, preview, setPreview, isPending } =
    useSignup();
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
            <h1 className="text-2xl font-bold text-pink-600">Sign Up</h1>
            <p>Please sign up to your account in the Flamingo.</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="photo"
                  render={() => (
                    <FormItem>
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
                          placeholder="youremail@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          className="rounded-full h-12"
                          placeholder="Your name"
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
                  Sign Up
                </Button>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link to="/sign-in" className="text-pink-600">
                    Sign In
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

export default signup;
