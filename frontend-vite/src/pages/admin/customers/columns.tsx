import { Badge } from "../../../components/ui/badge";
import type { Customer } from "../../../services/customers/customer.type";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Pagination } from "../../../types/pagination";

export const columns = (pagination: Pagination): ColumnDef<Customer>[] => [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.name;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <Badge>{row.original.email}</Badge>,
  },
];
