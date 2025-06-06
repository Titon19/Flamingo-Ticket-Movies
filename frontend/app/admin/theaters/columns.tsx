"use client";

import type { Theater } from "@/services/theaters/theater.type";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "./ActionColumn";
import { Badge } from "@/components/ui/badge";

export const columns = (
  currentPage: number,
  limit: number
): ColumnDef<Theater>[] => [
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
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => <Badge>{row.original.city}</Badge>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const theater = row.original;
      return <ActionColumn id={theater._id} />;
    },
  },
];
