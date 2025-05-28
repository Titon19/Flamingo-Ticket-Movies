import { DataTable } from "../../../../components/ui/data-table";
import { columns } from "./columns";

import WalletTransactionFilter from "../../../../components/Fragment/WalletTransactionFilter";
import useWallet from "../../../../hooks/admin/Transactions/Wallets/useWallet";

const index = () => {
  const {
    walletDatas,
    isLoading,
    pagination,
    changePage,
    handleLimitChange,
    isFilterLoading,
    onSubmit,
    form,
    handleReset,
  } = useWallet();

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Wallet Transactions</h1>
      <div className="flex flex-col gap-3">
        <WalletTransactionFilter
          form={form}
          onSubmit={onSubmit}
          isFilterLoading={isFilterLoading}
          handleReset={handleReset}
        />
        <DataTable
          searchValue=""
          handleSearchChange={() => {}}
          columns={columns(pagination)}
          data={walletDatas}
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
