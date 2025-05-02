"use client";
import { getTheaterParams } from "@/services/theaters/theater.service";
import type { Theater } from "@/services/theaters/theater.type";
import { baseResponseWithPagination } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const useFetchTheaters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPageParam = Number(searchParams?.get("page") || 1);
  const limitParam = Number(searchParams?.get("limit") || 10);
  const searchParam = String(searchParams?.get("search") || "");
  const [searchDebounce] = useDebounce(searchParam, 1000);

  const {
    data: theaters,
    isLoading,
    isError,
    error,
  } = useQuery<baseResponseWithPagination<Theater[]>>({
    queryKey: ["theaters", currentPageParam, limitParam, searchDebounce],

    queryFn: async () => {
      return await getTheaterParams({
        page: currentPageParam,
        limit: limitParam,
        search: searchDebounce,
      });
    },
  });

  const currentPage = theaters?.meta?.current_page || 1;
  const totalPages = theaters?.meta?.total_pages || 1;
  const pageCollections = theaters?.meta?.page_collections || [];

  const setQueryParams = (page: number, limit: number, search: string = "") => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("page", String(page));
    newParams.set("limit", String(limit));
    newParams.set("search", search);

    router?.push(`/admin/theaters?${newParams.toString()}`);
  };

  const handleChange = (page: number, limit: number, search: string) => {
    setQueryParams(page, limit, search);
  };

  const handleSearchChange = (searchTerm: string) => {
    setQueryParams(1, limitParam, searchTerm);
  };

  return {
    data: theaters,
    isLoading,
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

export default useFetchTheaters;
