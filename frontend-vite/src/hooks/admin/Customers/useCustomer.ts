import { useEffect, useState } from "react";
import { Customer } from "../../../services/customers/customer.type";
import { Pagination } from "../../../types/pagination";
import useQueryParams from "../useQueryParams";
import { useDebounce } from "use-debounce";
import { getCustomerParams } from "../../../services/customers/customer.service";
import { useLocation } from "react-router-dom";

const useCustomer = () => {
  const [customerDatas, setCustomerDatas] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    limit: 10,
    pageCollections: [],
  });

  const { setQueryParams, getQueryParams } = useQueryParams();
  const { search, page, limit } = getQueryParams();
  const [searchValue, setSearchValue] = useState<string>(() => {
    return search;
  });

  const [searchDebounce] = useDebounce(searchValue, 1000);
  const location = useLocation();

  const fetchCustomers = async (
    page = pagination.currentPage,
    limit = pagination.limit,
    search = ""
  ) => {
    setIsLoading(true);

    try {
      const response = await getCustomerParams({ page, limit, search });

      setCustomerDatas(response?.data || []);
      const totalPages = response?.pagination?.totalPages || 0;
      const totalItems = response?.pagination?.totalData || 0;
      const limitServer = response?.pagination?.limit || limit;
      const pageCollections = response?.pagination?.pageCollections || [];

      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        limit: limitServer,
        totalPages,
        totalItems,
        pageCollections,
      }));
    } catch (error) {
      console.log("Error fetching customers", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = (page: number) => {
    setQueryParams(page, pagination.limit, searchDebounce);
  };

  const changeLimit = (limit: number) => {
    setQueryParams(pagination.currentPage, limit, searchDebounce);
  };

  const handleLimitChange = (limit: string) => {
    const newLimit = parseInt(limit);
    changeLimit(newLimit);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchDebounce !== search) {
      setQueryParams(1, pagination.limit, searchDebounce);
      fetchCustomers(1, pagination.limit, searchDebounce);
      return;
    }

    fetchCustomers(page, limit, search);
  }, [location.search, searchDebounce]);

  return {
    fetchCustomers,
    customerDatas,
    isLoading,
    pagination,
    searchValue,
    searchDebounce,
    changePage,
    changeLimit,
    handleSearchChange,
    handleLimitChange,
  };
};

export default useCustomer;
