"use client";
import { Genre } from "@/services/genres/genre.type";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import useFetchGenres from "@/hooks/admin/Genres/useFetchGenres";
import { Input } from "@/components/ui/input";

import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GenresPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    currentPage,
    totalPages,
    pageCollections,
    handleChange,
    searchDebounce,
    limitParam,
    handleSearchChange,
  } = useFetchGenres();

  return (
    <>
      <h1 className="text-xl font-bold mb-3">Genres</h1>
      <div className="container mx-auto py-5">
        <Button asChild className="mb-3 rounded-full">
          <Link href="/admin/genres/create">
            <PlusCircleIcon width={16} height={16} />
            Add Data
          </Link>
        </Button>
        <Input
          placeholder={`Search genre...`}
          defaultValue={searchDebounce}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="max-w-sm mb-3 rounded-full"
        />
        <DataTable
          columns={columns(currentPage, limitParam)}
          isLoading={isLoading}
          isError={isError}
          error={error}
          data={data?.data as Genre[]}
          currentPage={currentPage}
          totalPages={totalPages}
          limitDefaultValue={String(limitParam)}
          handleNextPage={() =>
            handleChange(currentPage + 1, 10, searchDebounce)
          }
          pageCollections={pageCollections}
          handleCollectionPage={(pageNumber) =>
            handleChange(pageNumber, 10, searchDebounce)
          }
          handlePrevPage={() =>
            handleChange(currentPage - 1, 10, searchDebounce)
          }
          handleLimitChange={(limitValue) =>
            handleChange(1, limitValue, searchDebounce)
          }
        />
      </div>
    </>
  );
}
