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
import useGenreSubmit from "../../../hooks/admin/Genres/useGenreSubmit";

const CreateGenre = () => {
  const { onSubmit, isPending, form, detail } = useGenreSubmit();
  return (
    <>
      <h1 className="text-xl font-bold">
        {detail === undefined ? "Create Genre" : "Edit Genre"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/2">
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Nama genre" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button isLoading={isPending} type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateGenre;
