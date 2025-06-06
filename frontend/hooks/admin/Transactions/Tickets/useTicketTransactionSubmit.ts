"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTicketTransactions } from "@/services/transactions/tickets/ticket.service";
import { TicketTransaction } from "@/services/transactions/tickets/ticket.type";
import { baseResponseWithPagination } from "@/types/response";

const useTicketTransactionSubmit = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPageParam = Number(searchParams?.get("page") || 1);
  const limitParam = Number(searchParams?.get("limit") || 10);
  const startDate = searchParams?.get("start_date") || "";
  const endDate = searchParams?.get("end_date") || "";

  const { data: ticketFilterTransactions, isLoading } = useQuery<
    baseResponseWithPagination<TicketTransaction[]>
  >({
    queryKey: [
      "ticketFilterTransactions",
      currentPageParam,
      limitParam,
      startDate,
      endDate,
    ],

    queryFn: async () => {
      const startDateParse = startDate ? new Date(startDate) : undefined;
      const endDateParse = endDate ? new Date(endDate) : undefined;

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

  const handleFilterChange = (
    page: number,
    limit: number,
    start_date: string,
    end_date: string
  ) => {
    setQueryParams(page, limit, start_date, end_date);
  };

  return {
    ticketFilterTransactions,
    handleFilterChange,
    isLoading,
  };
};

export default useTicketTransactionSubmit;
