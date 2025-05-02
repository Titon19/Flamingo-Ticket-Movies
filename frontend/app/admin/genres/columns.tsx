"use client";

import { Genre } from "@/services/genres/genre.type";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "./ActionColumn";

export const columns = (
  currentPage: number,
  limit: number
): ColumnDef<Genre>[] => [
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
    header: "Genre",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const genre = row.original;
      return <ActionColumn id={genre._id} />;
    },
  },
];
