import { Link } from "react-router-dom";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./columns";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import useGenre from "../../../hooks/admin/Genres/useGenre";
import { Input } from "../../../components/ui/input";

const index = () => {
  const {
    genreDatas,
    isLoading,
    changePage,
    handleLimitChange,
    pagination,
    searchValue,
    handleSearchChange,
    fetchGenres,
  } = useGenre();

  const handleAfterDelete = async () => {
    return await fetchGenres(
      pagination.currentPage,
      pagination.limit,
      searchValue
    );
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Genres</h1>
      <Button asChild className="mb-3">
        <Link to="/admin/genres/create">
          <Plus width={16} height={16} /> Add Data
        </Link>
      </Button>
      <Input
        placeholder={`Search genre...`}
        value={searchValue}
        onChange={handleSearchChange}
        className="max-w-sm mb-3"
      />
      <DataTable
        searchValue={searchValue}
        columns={columns(handleAfterDelete, pagination)}
        handleLimitChange={handleLimitChange}
        data={genreDatas}
        isLoading={isLoading}
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPages}
        handleSearchChange={handleSearchChange}
        handlePrevPage={() => changePage(pagination.currentPage - 1)}
        handleCollectionPage={(pageNumber) => changePage(pageNumber)}
        handleNextPage={() => changePage(pagination.currentPage + 1)}
        pageCollections={pagination.pageCollections}
      />
    </div>
  );
};

export default index;
