import { Badge } from "../../../../components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { TicketTransaction } from "../../../../services/transactions/tickets/ticket.type";
import { formatRupiah, formatTanggal } from "../../../../lib/utils";
import { Pagination } from "../../../../types/pagination";

export const columns = (
  pagination: Pagination
): ColumnDef<TicketTransaction>[] => [
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
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => <p>{row.original.user.name}</p>,
  },
  {
    accessorKey: "movie",
    header: "Movie",
    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        <Badge className="bg-red-600">{row.original.movie.title}</Badge>
        <Badge className="bg-blue-900">{row.original.theater.name}</Badge>
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
