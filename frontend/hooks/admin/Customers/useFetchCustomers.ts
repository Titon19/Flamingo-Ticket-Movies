"use client";
import { getCustomerParams } from "@/services/customers/customer.service";
import { Customer } from "@/services/customers/customer.type";
import { baseResponseWithPagination } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const useFetchCustomers = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPageParam = Number(searchParams?.get("page") || 1);
  const limitParam = Number(searchParams?.get("limit") || 10);
  const searchParam = String(searchParams?.get("search") || "");
  const [searchDebounce] = useDebounce(searchParam, 1000);

  const {
    data: customers,
    isLoading,
    isError,
    error,
  } = useQuery<baseResponseWithPagination<Customer[]>>({
    queryKey: ["customers", currentPageParam, limitParam, searchDebounce],

    queryFn: async () => {
      return await getCustomerParams({
        page: currentPageParam,
        limit: limitParam,
        search: searchDebounce,
      });
    },
  });

  const currentPage = customers?.meta?.current_page || 1;
  const totalPages = customers?.meta?.total_pages || 1;
  const pageCollections = customers?.meta?.page_collections || [];

  const setQueryParams = (page: number, limit: number, search: string = "") => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("page", String(page));
    newParams.set("limit", String(limit));
    newParams.set("search", search);

    router?.push(`/admin/customers?${newParams.toString()}`);
  };

  const handleChange = (page: number, limit: number, search: string) => {
    setQueryParams(page, limit, search);
  };

  const handleSearchChange = (searchTerm: string) => {
    setQueryParams(1, limitParam, searchTerm);
  };

  return {
    data: customers,
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

export default useFetchCustomers;
