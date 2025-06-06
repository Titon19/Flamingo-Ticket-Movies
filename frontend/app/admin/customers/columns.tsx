"use client";

import { Customer } from "@/services/customers/customer.type";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const columns = (
  currentPage: number,
  limit: number
): ColumnDef<Customer>[] => [
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <Badge>{row.original.email}</Badge>,
  },
];
