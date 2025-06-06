"use client";
import { getMovieParams } from "@/services/movies/movie.service";
import type { Movie } from "@/services/movies/movie.type";
import { baseResponseWithPagination } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const useFetchMovies = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPageParam = Number(searchParams?.get("page") || 1);
  const limitParam = Number(searchParams?.get("limit") || 10);
  const searchParam = String(searchParams?.get("search") || "");
  const [searchDebounce] = useDebounce(searchParam, 1000);

  const {
    data: movies,
    isLoading: isLoadingMovies,
    isError,
    error,
  } = useQuery<baseResponseWithPagination<Movie[]>>({
    queryKey: ["movies", currentPageParam, limitParam, searchDebounce],

    queryFn: async () => {
      return await getMovieParams({
        page: currentPageParam,
        limit: limitParam,
        search: searchDebounce,
      });
    },
  });

  const currentPage = movies?.meta?.current_page || 1;
  const totalPages = movies?.meta?.total_pages || 1;
  const pageCollections = movies?.meta?.page_collections || [];

  const setQueryParams = (page: number, limit: number, search: string = "") => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("page", String(page));
    newParams.set("limit", String(limit));
    newParams.set("search", search);

    router?.push(`/admin/movies?${newParams.toString()}`);
  };

  const handleChange = (page: number, limit: number, search: string) => {
    setQueryParams(page, limit, search);
  };

  const handleSearchChange = (searchTerm: string) => {
    setQueryParams(1, limitParam, searchTerm);
  };

  return {
    data: movies,
    isLoadingMovies,
    isError,
    error,
    currentPage,
    totalPages,
    pageCollections,
    handleChange,
    handleSearchChange,
    searchParam,
    limitParam,
    searchDebounce,
  };
};

export default useFetchMovies;
