import { Badge } from "../../../components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import type { Movie } from "../../../services/movies/movie.type";
import ActionColumn from "./ActionColumn";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatRupiah } from "../../../lib/utils";

export const columns = (
  onAfterDelete: () => Promise<void>,
  pagination: {
    currentPage: number;
    limit: number;
  }
): ColumnDef<Movie>[] => [
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const movie = row.original;
      return (
        <div className="flex gap-3 w-[500px]">
          <img
            src={movie.thumbnailUrl}
            alt={movie.thumbnailUrl}
            className="w-[100px] h-[150px] object-cover  rounded-md"
          />
          <div className="space-y-3">
            <div>
              <h1 className="font-bold">{movie.title}</h1>
              <p className="text-wrap text-justify">{movie.description}</p>
            </div>
            <p className="font-bold">
              Bonus{" "}
              <Badge className="bg-yellow-300 text-black">{movie.bonus}</Badge>
            </p>
            <Badge variant={movie.available ? "default" : "destructive"}>
              {movie.available ? "Live Now" : "Coming Soon"}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <p>{formatRupiah(row.original.price)}</p>;
    },
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ row }) => <Badge>{row.original.genre.name}</Badge>,
  },
  {
    accessorKey: "theaters",
    header: "Theaters",
    cell: ({ row }) => {
      const theaters = row.original.theaters;
      return (
        <div className="flex flex-col gap-2">
          {theaters.map((theater) => (
            <Badge className="bg-blue-900" key={theater._id}>
              {theater.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const movie = row.original;
      return <ActionColumn id={movie._id} onAfterDelete={onAfterDelete} />;
    },
  },
];
