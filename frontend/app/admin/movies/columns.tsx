"use client";

import type { Movie } from "@/services/movies/movie.type";
import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "./ActionColumn";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";
import Image from "next/image";

export const columns = (
  currentPage: number,
  limit: number
): ColumnDef<Movie>[] => [
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
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const movie = row.original;
      return (
        <div className="flex gap-3 w-[500px]">
          <Image
            src={movie.thumbnailUrl}
            alt={movie.thumbnailUrl}
            width={100}
            height={150}
            className=" w-[100px] h-[150px] object-cover rounded-md"
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
            <Badge className="bg-blue-900 text-white" key={theater._id}>
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
      const genre = row.original;
      return <ActionColumn id={genre._id} />;
    },
  },
];
