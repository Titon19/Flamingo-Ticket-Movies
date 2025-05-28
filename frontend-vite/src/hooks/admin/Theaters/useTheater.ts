import { useEffect, useState } from "react";
import { getTheaterParams } from "../../../services/theaters/theater.service";
import type { Theater } from "../../../services/theaters/theater.type";
import type { Pagination } from "../../../types/pagination";
// import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import useQueryParams from "../useQueryParams";
import { useLocation } from "react-router-dom";

const useTheater = () => {
  const [theaterDatas, setTheaterDatas] = useState<Theater[]>([]);

  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
    limit: 10,
    pageCollections: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getQueryParams, setQueryParams } = useQueryParams();
  const { page, limit, search } = getQueryParams();

  const [searchValue, setSearchValue] = useState<string>(() => {
    return search;
  });
  const [searchDebounce] = useDebounce(searchValue, 1000);
  const location = useLocation();

  //   props page limit, dan search untuk ditangkap di fungsi getTheaterParams yang mananantinya dijalankan
  //   di fungsi fetchTheaters melalui props page dan limit di change page dan change limit
  const fetchTheaters = async (
    page = pagination.currentPage,
    limit = pagination.limit,
    search = ""
  ) => {
    setIsLoading(true);
    try {
      const response = await getTheaterParams({
        page,
        limit,
        search,
      });

      setTheaterDatas(response?.data || []);
      const totalItems = response?.pagination?.totalData || 0;
      const limitServer = response?.pagination?.limit || limit;
      const totalPages = response?.pagination?.totalPages || 0;

      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        limit: limitServer,
        totalItems,
        totalPages,
        pageCollections: response?.pagination?.pageCollections || [],
      }));
    } catch (error) {
      console.error("Error fetching theaters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //   props page dan limit di change page dan change limit untuk di jalankan kembali fungsi getTheaterParams
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
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchDebounce !== search) {
      setQueryParams(1, limit, searchDebounce);
      fetchTheaters(1, limit, searchDebounce);
      return;
    }

    fetchTheaters(page, limit, search);
  }, [location.search, searchDebounce, page, limit]);

  return {
    fetchTheaters,
    isLoading,
    theaterDatas,
    pagination,
    changePage,
    changeLimit,
    setQueryParams,
    handleLimitChange,
    handleSearchChange,
    searchValue,
  };
};

export default useTheater;
