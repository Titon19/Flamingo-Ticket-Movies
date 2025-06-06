"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit2 } from "lucide-react";
import DeleteDialog from "@/components/delete-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovie } from "@/services/movies/movie.service";

interface ActionProps {
  id: string;
}

const ActionColumn = ({ id }: ActionProps) => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => await deleteMovie(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
  const handleDelete = async () => {
    await mutateAsync();
  };

  return (
    <div className="flex gap-2">
      <Button asChild className="rounded-full" size={"icon"}>
        <Link href={`/admin/movies/${id}/edit`}>
          <Edit2 />
        </Link>
      </Button>
      <DeleteDialog onDelete={handleDelete} id={id} isPending={isPending} />
    </div>
  );
};

export default ActionColumn;
