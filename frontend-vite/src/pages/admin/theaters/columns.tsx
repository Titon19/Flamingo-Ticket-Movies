import { Badge } from "../../../components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { Theater } from "../../../services/theaters/theater.type";
import ActionColumn from "./ActionColumn";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns = (
  onAfterDelete: () => Promise<void>,
  pagination: {
    currentPage: number;
    limit: number;
  }
): ColumnDef<Theater>[] => {
  return [
    {
      accessorKey: "no",
      header: "No",
      cell: ({ row }) => {
        // Hitung nomor urut tabel (kolom "No")
        // Rumus: (currentPage - 1) * limit + row.index + 1
        // Contoh: currentPage = 2, limit = 10, row.index = 0 (index 0 di tabel)
        // (2 - 1) * 10 + 0 + 1 = 11

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
      cell: ({ row }) => <p>{row.original.name}</p>,
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
        return <ActionColumn id={theater._id} onAfterDelete={onAfterDelete} />;
      },
    },
  ];
};
