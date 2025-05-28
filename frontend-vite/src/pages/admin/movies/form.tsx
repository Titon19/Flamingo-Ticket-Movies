import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";

import type { Genre } from "../../../services/genres/genre.type";
import type { Movie } from "../../../services/movies/movie.type";
import type { Theater } from "../../../services/theaters/theater.type";
import { useLoaderData } from "react-router-dom";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import useMovieSubmit from "../../../hooks/admin/Movies/useMovieSubmit";
import { baseResponseWithPagination } from "../../../types/response";

type LoaderData = {
  genres: Genre[];
  theaters: baseResponseWithPagination<Theater[]>;
  detail: Movie | null;
};

const form = () => {
  const {
    onSubmit,
    isPending,
    form,
    handleChangeTheater,
    handleRemoveTheater,
    handleFileChange,
    selectedTheaters,
    preview,
  } = useMovieSubmit();
  const { genres, theaters, detail } = useLoaderData() as LoaderData;
  console.log(theaters, "THEEETAER");

  return (
    <>
      <h1 className="text-xl font-bold">
        {detail === null ? "Create Theater" : "Edit Theater"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/2">
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Price" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={() => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Upload Thumbnail"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  {preview ? (
                    <img
                      src={preview}
                      alt={"thumbnail"}
                      className="w-[100px] h-[150px] object-cover  rounded-md"
                    />
                  ) : (
                    detail?.thumbnail && (
                      <img
                        src={detail?.thumbnailUrl}
                        alt={"thumbnail"}
                        className="w-[100px] h-[150px] object-cover  rounded-md"
                      />
                    )
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="--Choose Genre--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre._id} value={genre._id}>
                          {genre.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="theaters"
              render={({}) => (
                <FormItem>
                  <FormLabel>Theaters</FormLabel>
                  <Select onValueChange={handleChangeTheater}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="--Choose Theater--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {theaters.data.map((theater) => (
                        <SelectItem key={theater._id} value={theater._id}>
                          {theater.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedTheaters?.length > 0 && (
              <div className="flex gap-3">
                {selectedTheaters.map((item: string, index: number) => (
                  <Badge
                    onClick={() => handleRemoveTheater(item)}
                    key={item + index}
                  >
                    <span>
                      {
                        theaters.data.find((theater) => theater._id === item)
                          ?.name
                      }
                    </span>
                  </Badge>
                ))}
              </div>
            )}

            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avaliable</FormLabel>
                  <FormControl>
                    <div className="flex gap-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label
                        htmlFor="available"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Showing Now
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bonus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bonus</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Bonus" />
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

export default form;
