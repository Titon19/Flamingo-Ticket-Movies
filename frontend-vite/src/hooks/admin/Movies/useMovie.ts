import { useEffect, useState } from "react";
import { Movie } from "../../../services/movies/movie.type";
import { Pagination } from "../../../types/pagination";
import useQueryParams from "../useQueryParams";
import { useDebounce } from "use-debounce";
import { getMovieParams } from "../../../services/movies/movie.service";
import { useLocation } from "react-router-dom";

const useMovie = () => {
  const [movieDatas, setMovieDatas] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
    pageCollections: [],
  });

  const { setQueryParams, getQueryParams } = useQueryParams();
  const { search, page, limit } = getQueryParams();
  const [searchValue, setSearchValue] = useState<string>(() => {
    return search;
  });
  const [searchDebounce] = useDebounce(searchValue, 1000);
  const location = useLocation();

  const fetchMovies = async (
    page = pagination.currentPage,
    limit = pagination.limit,
    search = ""
  ) => {
    setIsLoading(true);

    const response = await getMovieParams({ page, limit, search });
    setMovieDatas(response?.data || []);

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
    try {
    } catch (error) {
      console.log("Error fetching movies", error);
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
      fetchMovies(1, limit, searchDebounce);
      return;
    }

    fetchMovies(page, limit, search);
  }, [location.search, searchDebounce]);

  return {
    fetchMovies,
    isLoading,
    searchValue,
    setSearchValue,
    movieDatas,
    pagination,
    changePage,
    changeLimit,
    handleLimitChange,
    handleSearchChange,
    searchDebounce,
    setQueryParams,
  };
};

export default useMovie;
