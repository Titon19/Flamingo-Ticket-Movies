import { Link } from "react-router-dom";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./columns";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "../../../components/ui/input";
import useMovie from "../../../hooks/admin/Movies/useMovie";

const index = () => {
  const {
    movieDatas,
    isLoading,
    changePage,
    handleLimitChange,
    pagination,
    searchValue,
    handleSearchChange,
    fetchMovies,
  } = useMovie();

  const handleAfterDelete = async () => {
    return await fetchMovies(
      pagination.currentPage,
      pagination.limit,
      searchValue
    );
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Movies</h1>
      <Button asChild className="mb-3">
        <Link to="/admin/movies/create">
          <Plus width={16} height={16} /> Add Data
        </Link>
      </Button>
      <Input
        placeholder={`Search movie...`}
        value={searchValue}
        onChange={handleSearchChange}
        className="max-w-sm mb-3"
      />
      <DataTable
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        data={movieDatas}
        columns={columns(handleAfterDelete, pagination)}
        isLoading={isLoading}
        totalPage={pagination.totalPages}
        currentPage={pagination.currentPage}
        handleNextPage={() => changePage(pagination.currentPage + 1)}
        pageCollections={pagination.pageCollections}
        handleCollectionPage={(NumberPage) => changePage(NumberPage)}
        handlePrevPage={() => changePage(pagination.currentPage - 1)}
        handleLimitChange={handleLimitChange}
      />
    </div>
  );
};

export default index;
