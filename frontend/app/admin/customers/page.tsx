"use client";
import { Customer } from "@/services/customers/customer.type";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import useFetchCustomers from "@/hooks/admin/Customers/useFetchCustomers";
import { Input } from "@/components/ui/input";

export default function CustomersPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    currentPage,
    totalPages,
    pageCollections,
    handleChange,
    searchDebounce,
    limitParam,
    handleSearchChange,
  } = useFetchCustomers();

  return (
    <>
      <h1 className="text-xl font-bold mb-3">Customers</h1>
      <div className="container mx-auto py-5">
        <Input
          placeholder={`Search customer...`}
          defaultValue={searchDebounce}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="max-w-sm mb-3 rounded-full"
        />
        <DataTable
          columns={columns(currentPage, limitParam)}
          isLoading={isLoading}
          isError={isError}
          error={error}
          data={data?.data as Customer[]}
          currentPage={currentPage}
          totalPages={totalPages}
          limitDefaultValue={String(limitParam)}
          handleNextPage={() =>
            handleChange(currentPage + 1, 10, searchDebounce)
          }
          pageCollections={pageCollections}
          handleCollectionPage={(pageNumber) =>
            handleChange(pageNumber, 10, searchDebounce)
          }
          handlePrevPage={() =>
            handleChange(currentPage - 1, 10, searchDebounce)
          }
          handleLimitChange={(limitValue) =>
            handleChange(1, limitValue, searchDebounce)
          }
        />
      </div>
    </>
  );
}
