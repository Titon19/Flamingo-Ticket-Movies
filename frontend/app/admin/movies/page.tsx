"use client";
import { Movie } from "@/services/movies/movie.type";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import useFetchMovies from "@/hooks/admin/Movies/useFetchMovies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function MoviesPage() {
  const {
    data,
    isLoadingMovies,
    isError,
    error,
    currentPage,
    totalPages,
    pageCollections,
    handleChange,
    searchDebounce,
    limitParam,
    handleSearchChange,
  } = useFetchMovies();

  return (
    <>
      <h1 className="text-xl font-bold mb-3">Movies</h1>
      <div className="container mx-auto py-5">
        <Button asChild className="mb-3 rounded-full">
          <Link href="/admin/movies/create">
            <PlusCircleIcon width={16} height={16} />
            Add Data
          </Link>
        </Button>
        <Input
          placeholder={`Search Movies...`}
          defaultValue={searchDebounce}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="max-w-sm mb-3 rounded-full"
        />
        <DataTable
          columns={columns(currentPage, limitParam)}
          isLoading={isLoadingMovies}
          isError={isError}
          error={error}
          data={data?.data as Movie[]}
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
