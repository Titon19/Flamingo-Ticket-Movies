import { DataTable } from "../../../../components/ui/data-table";
import useTicket from "../../../../hooks/admin/Transactions/Tickets/useTicket";
import { columns } from "./columns";
import TicketTransactionFilter from "../../../../components/Fragment/TicketTransactionFilter";

const index = () => {
  const {
    ticketDatas,
    isLoading,
    pagination,
    changePage,
    handleLimitChange,
    isFilterLoading,
    onSubmit,
    form,
    handleReset,
  } = useTicket();

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Ticket Transactions</h1>
      <div className="flex flex-col gap-3">
        <TicketTransactionFilter
          form={form}
          onSubmit={onSubmit}
          isFilterLoading={isFilterLoading}
          handleReset={handleReset}
        />
        <DataTable
          searchValue=""
          handleSearchChange={() => {}}
          columns={columns(pagination)}
          data={ticketDatas}
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
    </div>
  );
};

export default index;
