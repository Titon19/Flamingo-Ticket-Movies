import { useEffect, useState } from "react";
import type { Genre } from "../../../services/genres/genre.type";
import type { Pagination } from "../../../types/pagination";
import { getGenreParams } from "../../../services/genres/genre.service";
import useQueryParams from "../useQueryParams";
import { useDebounce } from "use-debounce";
import { useLocation } from "react-router-dom";
const useGenre = () => {
  const [genreDatas, setGenreDatas] = useState<Genre[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
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

  const fetchGenres = async (
    page = pagination.currentPage,
    limit = pagination.limit,
    search = ""
  ) => {
    setIsLoading(true);

    try {
      const response = await getGenreParams({
        page,
        limit,
        search,
      });

      setGenreDatas(response?.data || []);
      const totalItems = response?.pagination?.totalData || 0;
      const totalPages = response?.pagination?.totalPages || 0;
      const limitServer = response?.pagination?.limit || limit;
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
      console.error("Error fetching genres:", error);
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
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    if (searchDebounce !== search) {
      setQueryParams(1, limit, searchDebounce);
      fetchGenres(1, limit, searchDebounce);
      return;
    }

    fetchGenres(page, limit, search);
  }, [location.search, searchDebounce]);

  return {
    fetchGenres,
    isLoading,
    searchValue,
    setSearchValue,
    genreDatas,
    pagination,
    changePage,
    changeLimit,
    handleLimitChange,
    handleSearchChange,
    searchDebounce,
    setQueryParams,
  };
};

export default useGenre;
