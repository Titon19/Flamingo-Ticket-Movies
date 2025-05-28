import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { WalletTransaction } from "../../../../services/transactions/wallets/wallet.type";
import { formatRupiah, formatTanggal } from "../../../../lib/utils";
import { Badge } from "../../../../components/ui/badge";
import { Pagination } from "../../../../types/pagination";

export const columns = (
  pagination: Pagination
): ColumnDef<WalletTransaction>[] => [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => {
      const rowIndex = row.index + 1;
      const currentPageStartIndex =
        (pagination.currentPage - 1) * pagination.limit;
      const displayIndex = currentPageStartIndex + rowIndex;
      return <div>{displayIndex}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tgl Transaksi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <p>{formatTanggal(row.original.createdAt)}</p>,
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => <p>{formatRupiah(row.original.price)}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className="capitalize">{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "wallet",
    header: "Customer",
    cell: ({ row }) => <p>{row.original.wallet.user.name}</p>,
  },
];
