"use client";

import { Badge } from "@/components/ui/badge";
import { formatRupiah, formatTanggal } from "@/lib/utils";
import { WalletTransaction } from "@/services/transactions/wallets/wallet.type";
import { ColumnDef } from "@tanstack/react-table";

export const columns = (
  currentPage: number,
  limit: number
): ColumnDef<WalletTransaction>[] => [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => {
      const rowIndex = row.index + 1;
      const currentPageStartIndex = (currentPage - 1) * limit;
      const displayIndex = currentPageStartIndex + rowIndex;
      return <div>{displayIndex}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Transaction Date",
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
