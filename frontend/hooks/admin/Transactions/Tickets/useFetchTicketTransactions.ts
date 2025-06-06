"use client";
import { getTicketTransactions } from "@/services/transactions/tickets/ticket.service";
import type { TicketTransaction } from "@/services/transactions/tickets/ticket.type";
import { baseResponseWithPagination } from "@/types/response";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const useFetchTicketTransactions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPageParam = Number(searchParams?.get("page") || 1);
  const limitParam = Number(searchParams?.get("limit") || 10);
  const startDate = searchParams?.get("start_date") || "";
  const endDate = searchParams?.get("end_date") || "";

  const startDateParse = startDate
    ? new Date(new Date(startDate).setHours(23, 59, 59, 999))
    : undefined;

  const endDateParse = endDate
    ? new Date(new Date(endDate).setHours(23, 59, 59, 999))
    : undefined;

  const {
    data: ticketTransactions,
    isLoading: isLoadingTicketTransactions,
    isError,
    error,
  } = useQuery<baseResponseWithPagination<TicketTransaction[]>>({
    queryKey: [
      "ticketTransactions",
      currentPageParam,
      limitParam,
      startDate,
      endDate,
    ],

    queryFn: async () => {
      return await getTicketTransactions({
        page: currentPageParam,
        limit: limitParam,
        filter: {
          start_date: startDateParse,
          end_date: endDateParse,
        },
      });
    },
  });

  const currentPage = ticketTransactions?.meta?.current_page || 1;
  const totalPages = ticketTransactions?.meta?.total_pages || 1;
  const pageCollections = ticketTransactions?.meta?.page_collections || [];

  const setQueryParams = (
    page: number,
    limit: number,
    start_date: string = "",
    end_date: string = ""
  ) => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("page", String(page));
    newParams.set("limit", String(limit));
    newParams.set("start_date", String(start_date || ""));
    newParams.set("end_date", String(end_date || ""));

    router?.push(`/admin/transaction-tickets?${newParams.toString()}`);
  };

  const handleChange = (
    page: number,
    limit: number,
    start_date: string,
    end_date: string
  ) => {
    setQueryParams(page, limit, start_date, end_date);
  };

  return {
    data: ticketTransactions,
    isLoadingTicketTransactions,
    isError,
    error,
    currentPage,
    totalPages,
    pageCollections,
    handleChange,
    limitParam,
    startDate,
    endDate,
  };
};

export default useFetchTicketTransactions;
