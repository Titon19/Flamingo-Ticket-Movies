import { useEffect, useState } from "react";
import type { TicketTransaction } from "../../../../services/transactions/tickets/ticket.type";
import { Pagination } from "../../../../types/pagination";
import useQueryParams from "../../useQueryParams";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getTicketTransactions,
  type ticketFilterDate,
  ticketFilterDateSchema,
} from "../../../../services/transactions/tickets/ticket.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useTicket = () => {
  const [ticketDatas, setTicketDatas] = useState<TicketTransaction[]>([]);
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

  const form = useForm<ticketFilterDate>({
    resolver: zodResolver(ticketFilterDateSchema),
    defaultValues: {
      start_date: parsedStartDate,
      end_date: parsedEndDate,
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  const fetchTransactions = async (
    page = pagination.currentPage,
    limit = pagination.limit,
    data: ticketFilterDate
  ) => {
    setIsLoading(true);
    try {
      const response = await getTicketTransactions({ page, limit, data });

      setTicketDatas(response?.data || []);

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

  const changeDate = (data: ticketFilterDate) => {
    setQueryParams(pagination.currentPage, pagination.limit, "", data);
  };

  const handleLimitChange = (limit: string) => {
    const newLimit = parseInt(limit);
    changeLimit(newLimit);
  };

  const onSubmit = async (data: ticketFilterDate) => {
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
    navigate("/admin/ticket-transactions");
  };

  useEffect(() => {
    fetchTransactions(page, limit, {
      start_date: startDate ? new Date(startDate) : undefined,
      end_date: endDate ? new Date(endDate) : undefined,
    });
  }, [location.search]);

  return {
    fetchTransactions,
    ticketDatas,
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

export default useTicket;
