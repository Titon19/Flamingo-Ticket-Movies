"use client";
import type { WalletTransaction } from "@/services/transactions/wallets/wallet.type";
import { DataTable } from "@/components/data-table";
import useFetchWalletTransactions from "@/hooks/admin/Transactions/Wallets/useFetchWalletTransactions";
import { Input } from "@/components/ui/input";
import { DatePickerRange } from "@/components/date-pick-range";
import { columns } from "./columns";
import useWalletTransactionSubmit from "@/hooks/admin/Transactions/Wallets/useWalletTransactionSubmit";
import { format } from "date-fns";

export default function TransactionsWalletPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    currentPage,
    totalPages,
    pageCollections,
    handleChange,
    limitParam,
    startDate,
    endDate,
  } = useFetchWalletTransactions();

  console.log(data?.data, "RESPONSE");

  const { handleFilterChange } = useWalletTransactionSubmit();

  return (
    <>
      <h1 className="text-xl font-bold mb-3">Wallet Transactions</h1>
      <div className="container mx-auto py-5">
        <DatePickerRange handleFilterChange={handleFilterChange} />
        <DataTable
          columns={columns(currentPage, limitParam)}
          isLoading={isLoading}
          isError={isError}
          error={error}
          data={data?.data as WalletTransaction[]}
          currentPage={currentPage}
          totalPages={totalPages}
          limitDefaultValue={String(limitParam)}
          handleNextPage={() =>
            handleChange(currentPage + 1, 10, startDate, endDate)
          }
          pageCollections={pageCollections}
          handleCollectionPage={(pageNumber) =>
            handleChange(pageNumber, 10, startDate, endDate)
          }
          handlePrevPage={() =>
            handleChange(currentPage - 1, 10, startDate, endDate)
          }
          handleLimitChange={(limitValue) =>
            handleChange(1, limitValue, startDate, endDate)
          }
        />
      </div>
    </>
  );
}
