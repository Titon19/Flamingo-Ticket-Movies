"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  currentPage: number;
  totalPages: number;
  pageCollections: number[];
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleCollectionPage: (page: number) => void;
  handleLimitChange: (limit: number) => void;
  limitDefaultValue: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  isError,
  error,
  currentPage,
  totalPages,
  pageCollections,
  handleNextPage,
  handlePrevPage,
  handleCollectionPage,
  handleLimitChange,
  limitDefaultValue,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="rounded-md border">
        {isLoading ? (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 flex justify-center items-center gap-3"
                >
                  <Loader2 className="animate-spin" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <>
                  {isError ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center text-red-600"
                      >
                        Error: {error?.message}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex gap-2 md:flex-row flex-col-reverse justify-start">
        {/* Jika rownya kurang dari atau sama dengan limit maka jangan tampilkan limit */}
        {data?.length >= parseInt(limitDefaultValue) && (
          <div className="flex items-center space-x-2 ">
            <Badge>Showing</Badge>
            <Select
              onValueChange={(limitValue) =>
                handleLimitChange(Number(limitValue))
              }
              defaultValue={limitDefaultValue}
            >
              <SelectTrigger className="w-[100px] rounded-full">
                <SelectValue placeholder="Show" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Show</SelectLabel>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex items-center space-x-2 py-4">
          <Badge>
            Page {currentPage} of {totalPages}
          </Badge>
          <Button
            variant="outline"
            className="rounded-full"
            size="sm"
            onClick={() => handlePrevPage && handlePrevPage()}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {pageCollections?.map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "default" : "outline"}
              size="icon"
              className="rounded-full"
              onClick={() =>
                handleCollectionPage && handleCollectionPage(pageNumber)
              }
            >
              {pageNumber}
            </Button>
          ))}
          <Button
            variant="outline"
            className="rounded-full"
            size="sm"
            onClick={() => handleNextPage && handleNextPage()}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
