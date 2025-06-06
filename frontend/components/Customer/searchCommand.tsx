"use client";

import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { Movie } from "@/services/global/global.type";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getSearchMovies } from "@/services/public/public.service";
import CardHorizontal from "./SearchMovies/CardHorizontal/CardHorizontal";

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 500);

  const { data: searchMovie = [], isLoading: isLoadingSearchMovie } = useQuery({
    queryKey: ["search-movies", debouncedInput],
    queryFn: () => getSearchMovies(debouncedInput).then((res) => res.data),
    enabled: Boolean(debouncedInput && debouncedInput.trim().length > 0),
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center px-4 py-3 lg:w-96 h-12 rounded-full cursor-pointer border text-sm text-muted-foreground"
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="flex-1 text-left">Search movies...</span>
        <kbd className="ml-auto text-xs border px-1 py-0.5 rounded">Ctrl K</kbd>
      </div>

      <div className="block lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="bg-pink-600 text-white md:p-4 p-2 rounded-full"
        >
          <Search className="md:w-6 md:h-6 w-4 h-4" />
        </button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={input}
          onValueChange={(value) => setInput(value)}
          placeholder="Search movies..."
        />
        <CommandList>
          <CardHorizontal
            movies={searchMovie ?? ([] as Movie[])}
            isLoading={isLoadingSearchMovie}
            onClick={() => setOpen(false)}
          />
        </CommandList>
      </CommandDialog>
    </>
  );
}
