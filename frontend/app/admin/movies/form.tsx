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
import useMovieSubmit from "@/hooks/admin/Movies/useMovieSubmit";
import { SaveIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FormMovie = ({ itemId }: { itemId?: string }) => {
  const {
    detail,
    onSubmit,
    isPending,
    isLoading,
    form,
    handleChangeTheater,
    handleRemoveTheater,
    handleFileChange,
    preview,
    selectedTheaters,
    genres,
    genreSelectorLoading,
    theaters,
    theaterSelectorLoading,
  } = useMovieSubmit({ itemId });
  return (
    <>
      <h1 className="text-xl font-bold">
        {itemId ? "Edit Movie" : "Create Movie"}
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
                    <Input
                      {...field}
                      type="text"
                      disabled={isLoading}
                      placeholder="Title"
                    />
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
                    <Input
                      {...field}
                      type="number"
                      disabled={isLoading}
                      placeholder="Price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      disabled={isLoading}
                      placeholder="Upload Thumbnail"
                      onChange={(e) => handleFileChange(e, "thumbnail")}
                    />
                  </FormControl>
                  {preview.thumbnail ? (
                    <img
                      src={preview.thumbnail}
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
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      disabled={isLoading}
                      placeholder="Upload Banner"
                      onChange={(e) => handleFileChange(e, "banner")}
                    />
                  </FormControl>
                  {preview.banner ? (
                    <img
                      src={preview.banner}
                      alt={"banner"}
                      className="w-[100px] h-[150px] object-cover  rounded-md"
                    />
                  ) : (
                    detail?.banner && (
                      <img
                        src={detail?.bannerUrl}
                        alt={"banner"}
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
                    <Textarea
                      {...field}
                      disabled={isLoading}
                      placeholder="Description"
                    />
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger disabled={genreSelectorLoading}>
                        <SelectValue placeholder="--Choose Genre--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genres?.map((genre) => (
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
                      <SelectTrigger disabled={theaterSelectorLoading}>
                        <SelectValue placeholder="--Choose Theater--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {theaters?.map((theater) => (
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
                      {theaters?.find((theater) => theater._id === item)?.name}
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
                    <Input
                      {...field}
                      type="text"
                      disabled={isLoading}
                      placeholder="Bonus"
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

export default FormMovie;
