import { useEffect, useState } from "react";
import { Pagination } from "../../../../types/pagination";
import useQueryParams from "../../useQueryParams";
import { useLocation, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WalletTransaction } from "../../../../services/transactions/wallets/wallet.type";
import {
  getWalletTransactions,
  walletFilterDate,
  WalletTransactionSchema,
} from "../../../../services/transactions/wallets/wallet.service";

const useWallet = () => {
  const [walletDatas, setWalletDatas] = useState<WalletTransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
    pageCollections: [],
  });

  const { getQueryParams, setQueryParams } = useQueryParams();
  const { page, limit, startDate, endDate } = getQueryParams();

  const parsedStartDate = startDate ? new Date(startDate) : undefined;
  const parsedEndDate = endDate ? new Date(endDate) : undefined;

  const form = useForm<walletFilterDate>({
    resolver: zodResolver(WalletTransactionSchema),
    defaultValues: {
      start_date: parsedStartDate,
      end_date: parsedEndDate,
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  const fetchWalletTransactions = async (
    page = pagination.currentPage,
    limit = pagination.limit,
    data: walletFilterDate
  ) => {
    setIsLoading(true);
    try {
      const response = await getWalletTransactions({ page, limit, data });

      setWalletDatas(response?.data || []);

      const totalItems = response?.pagination?.totalData || 0;
      const limitServer = response?.pagination?.limit || limit;
      const totalPages = response?.pagination?.totalPages || 0;
      const pageCollections = response?.pagination?.pageCollections || [];

      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        limit: limitServer,
        totalItems,
        totalPages,
        pageCollections,
      }));
    } catch (error) {
      console.log("Error fetching transaction data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = (page: number) => {
    setQueryParams(page, pagination.limit, "", form.getValues());
  };

  const changeLimit = (limit: number) => {
    setQueryParams(pagination.currentPage, limit, "", form.getValues());
  };

  const changeDate = (data: walletFilterDate) => {
    setQueryParams(pagination.currentPage, pagination.limit, "", data);
  };

  const handleLimitChange = (limit: string) => {
    const newLimit = parseInt(limit);
    changeLimit(newLimit);
  };

  const onSubmit = async (data: walletFilterDate) => {
    setIsFilterLoading(true);
    try {
      setQueryParams(pagination.currentPage, pagination.limit, "", data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFilterLoading(false);
    }
  };

  const handleReset = () => {
    form.reset();
    navigate("/admin/wallet-transactions");
  };

  useEffect(() => {
    fetchWalletTransactions(page, limit, {
      start_date: startDate ? new Date(startDate) : undefined,
      end_date: endDate ? new Date(endDate) : undefined,
    });
  }, [location.search]);

  return {
    fetchWalletTransactions,
    walletDatas,
    isLoading,
    isFilterLoading,
    pagination,
    form,
    onSubmit,
    changePage,
    changeLimit,
    changeDate,
    handleLimitChange,
    handleReset,
  };
};

export default useWallet;
