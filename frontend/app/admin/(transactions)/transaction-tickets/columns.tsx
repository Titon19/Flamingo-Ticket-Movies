"use client";

import { Badge } from "@/components/ui/badge";
import { formatRupiah, formatTanggal } from "@/lib/utils";
import type { TicketTransaction } from "@/services/transactions/tickets/ticket.type";
import { ColumnDef } from "@tanstack/react-table";

export const columns = (
  currentPage: number,
  limit: number
): ColumnDef<TicketTransaction>[] => [
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
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => <p>{row.original.user.name}</p>,
  },
  {
    accessorKey: "movie",
    header: "Movie",
    cell: ({ row }) => (
      <div className="flex flex-col gap-2 ">
        <Badge className="bg-red-600 text-white">
          {row.original.movie.title}
        </Badge>
        <Badge className="bg-blue-900 text-white">
          {row.original.theater.name}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "subtotal",
    header: "Sub Total",
    cell: ({ row }) => <p>{formatRupiah(row.original.subtotal)}</p>,
  },
  {
    accessorKey: "bookingFee",
    header: "Booking Fee",
    cell: ({ row }) => <p>{formatRupiah(row.original.bookingFee)}</p>,
  },
  {
    accessorKey: "tax",
    header: "Tax",
    cell: ({ row }) => <p>{formatRupiah(row.original.tax)}</p>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <p>{formatRupiah(row.original.total)}</p>,
  },
];
