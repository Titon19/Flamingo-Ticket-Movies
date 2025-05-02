"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWalletTransactions } from "@/services/transactions/wallets/wallet.service";
import { WalletTransaction } from "@/services/transactions/wallets/wallet.type";
import { baseResponseWithPagination } from "@/types/response";

const useWalletTransactionSubmit = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPageParam = Number(searchParams?.get("page") || 1);
  const limitParam = Number(searchParams?.get("limit") || 10);
  const startDate = searchParams?.get("start_date") || "";
  const endDate = searchParams?.get("end_date") || "";

  const { data: walletFilterTransactions, isLoading } = useQuery<
    baseResponseWithPagination<WalletTransaction[]>
  >({
    queryKey: [
      "walletFilterTransactions",
      currentPageParam,
      limitParam,
      startDate,
      endDate,
    ],

    queryFn: async () => {
      const startDateParse = startDate ? new Date(startDate) : undefined;
      const endDateParse = endDate ? new Date(endDate) : undefined;

      return await getWalletTransactions({
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

    router?.push(`/admin/transaction-wallets?${newParams.toString()}`);
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
    walletFilterTransactions,
    handleFilterChange,
    isLoading,
  };
};

export default useWalletTransactionSubmit;
