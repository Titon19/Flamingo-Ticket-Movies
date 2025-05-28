import { DataTable } from "../../../components/ui/data-table";
import { Input } from "../../../components/ui/input";
import useCustomer from "../../../hooks/admin/Customers/useCustomer";

import { columns } from "./columns";

const index = () => {
  const {
    customerDatas,
    searchValue,
    changePage,
    isLoading,
    handleLimitChange,
    handleSearchChange,
    pagination,
  } = useCustomer();

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Customers</h1>
      <Input
        placeholder={`Search customer...`}
        value={searchValue}
        onChange={handleSearchChange}
        className="max-w-sm mb-3"
      />
      <DataTable
        searchValue={searchValue}
        columns={columns(pagination)}
        handleLimitChange={handleLimitChange}
        data={customerDatas}
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
