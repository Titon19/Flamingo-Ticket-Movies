import { Link } from "react-router-dom";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./columns";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import useTheater from "../../../hooks/admin/Theaters/useTheater";
import { Input } from "../../../components/ui/input";

const index = () => {
  const {
    theaterDatas,
    isLoading,
    changePage,
    handleLimitChange,
    pagination,
    searchValue,
    handleSearchChange,
    fetchTheaters,
  } = useTheater();

  const handleAfterDelete = async () => {
    return await fetchTheaters(
      pagination.currentPage,
      pagination.limit,
      searchValue
    );
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Theaters</h1>
      <Button asChild className="mb-3">
        <Link to="/admin/theaters/create">
          <Plus width={16} height={16} /> Add Data
        </Link>
      </Button>
      <Input
        placeholder={`Search theater...`}
        value={searchValue}
        onChange={handleSearchChange}
        className="max-w-sm mb-3"
      />
      <DataTable
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        columns={columns(handleAfterDelete, pagination)}
        data={theaterDatas}
        isLoading={isLoading}
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPages}
        handlePrevPage={() => changePage(pagination.currentPage - 1)}
        handleCollectionPage={(pageNumber) => changePage(pageNumber)}
        handleNextPage={() => changePage(pagination.currentPage + 1)}
        pageCollections={pagination.pageCollections}
        handleLimitChange={handleLimitChange}
      />
    </div>
  );
};

export default index;
