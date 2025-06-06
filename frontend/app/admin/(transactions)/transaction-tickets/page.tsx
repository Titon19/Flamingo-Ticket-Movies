"use client";
import type { TicketTransaction } from "@/services/transactions/tickets/ticket.type";
import { DataTable } from "@/components/data-table";
import useFetchTicketTransactions from "@/hooks/admin/Transactions/Tickets/useFetchTicketTransactions";
import { DatePickerRange } from "@/components/date-pick-range";
import { columns } from "./columns";
import useTicketTransactionSubmit from "@/hooks/admin/Transactions/Tickets/useTicketTransactionSubmit";

export default function TransactionsTicketPage() {
  const {
    data,
    isLoadingTicketTransactions,
    isError,
    error,
    currentPage,
    totalPages,
    pageCollections,
    handleChange,
    limitParam,
    startDate,
    endDate,
  } = useFetchTicketTransactions();

  console.log(data?.data, "RESPONSE");

  const { handleFilterChange } = useTicketTransactionSubmit();

  return (
    <>
      <h1 className="text-xl font-bold mb-3">Ticket Transactions</h1>
      <div className="container mx-auto py-5">
        <DatePickerRange handleFilterChange={handleFilterChange} />
        <DataTable
          columns={columns(currentPage, limitParam)}
          isLoading={isLoadingTicketTransactions}
          isError={isError}
          error={error}
          data={data?.data as TicketTransaction[]}
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
