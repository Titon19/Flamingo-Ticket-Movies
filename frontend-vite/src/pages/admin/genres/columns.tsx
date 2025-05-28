import { Badge } from "../../../components/ui/badge";
import type { Genre } from "../../../services/genres/genre.type";
import type { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "./ActionColumn";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns = (
  onAfterDelete: () => Promise<void>,
  pagination: {
    currentPage: number;
    limit: number;
  }
): ColumnDef<Genre>[] => [
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
          Genre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <Badge>{row.original.name}</Badge>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const genre = row.original;
      return <ActionColumn id={genre._id} onAfterDelete={onAfterDelete} />;
    },
  },
];
