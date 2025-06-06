"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  createGenre,
  editGenre,
  type genreValue,
  genreSchema,
  detailGenre,
} from "@/services/genres/genre.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Genre } from "@/services/genres/genre.type";
import { useEffect } from "react";
import { toast } from "sonner";

const useGenreSubmit = ({ itemId }: { itemId?: string }) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { data: detail, isLoading } = useQuery<Genre>({
    queryKey: ["detail-genre", itemId],
    queryFn: () => {
      return detailGenre(itemId!).then((res) => res.data);
    },
    enabled: !!itemId,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: genreValue) => {
      return itemId ? editGenre(data, itemId) : createGenre(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
  });

  const form = useForm<genreValue>({
    resolver: zodResolver(genreSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (itemId) {
      form.setValue("name", detail?.name || "");
    }
  }, [form, detail]);

  const onSubmit = async (data: genreValue) => {
    try {
      const response = await mutateAsync(data);
      if (response.status === "Success") {
        toast.success(response.message || "Password changed successfully");
      } else {
        toast.error(response.message || "Password change failed");
      }
      router.push("/admin/genres");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return {
    onSubmit,
    isPending,
    isLoading,
    form,
  };
};

export default useGenreSubmit;
