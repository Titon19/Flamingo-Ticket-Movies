import SearchableSelect from "@/components/searchable-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useFilterSheet from "@/hooks/customer/browse-movies/useFilterSheet";

import { Filter } from "lucide-react";

const FilterSheet = () => {
  const { removeCityFilter, onSubmit, form, genres, theaters, cities, filter } =
    useFilterSheet();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="border-2 hover:border-pink-600 transition-all duration-300 ease-in-out rounded-full dark:bg-neutral-100 dark:text-black dark:hover:bg-neutral-200  bg-neutral-900 hover:bg-neutral-800 text-white  ">
          <Filter />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex gap-2">
            <Filter width={20} /> Filter
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 p-4 overflow-y-auto"
          >
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {genres?.map((genre) => (
                        <div
                          key={genre._id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={genre._id} id={genre._id} />
                          <Label htmlFor={genre._id}>{genre.name}</Label>
                        </div>
                      ))}
                    </RadioGroup>
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
                  <FormControl>
                    <SearchableSelect
                      items={cities ?? []}
                      valueKey="id"
                      labelKey="name"
                      placeholder="Search a city"
                      onSelect={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {filter?.city && (
              <Badge className="cursor-pointer" onClick={removeCityFilter}>
                {cities?.find((city) => city.id === filter.city)?.name}
              </Badge>
            )}

            <FormLabel>Theater</FormLabel>
            {theaters?.map((theater) => (
              <FormField
                key={theater._id}
                control={form.control}
                name="theaters"
                render={({ field }) => {
                  return (
                    <FormItem className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(theater._id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...(field.value || []),
                                theater._id,
                              ]);
                            } else {
                              field.onChange(
                                field.value
                                  ? field.value.filter(
                                      (value) => value !== theater._id
                                    )
                                  : []
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {theater.name}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avilability</FormLabel>
                  <FormControl className="flex items-center gap-2">
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <div key={1} className="flex items-center space-x-2">
                        <RadioGroupItem value={"1"} id={"now-showing"} />
                        <Label htmlFor={"now-showing"}>Now Showing</Label>
                      </div>
                      <div key={0} className="flex items-center space-x-2">
                        <RadioGroupItem value={"0"} id={"coming-soon"} />
                        <Label htmlFor={"coming-soon"}>Coming Soon</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full rounded-full">
              Show Filtered
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
