import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  createGenre,
  editGenre,
  genreData,
  genreSchema,
} from "../../../services/genres/genre.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Genre } from "../../../services/genres/genre.type";

const useGenreSubmit = () => {
  const detail = useLoaderData() as Genre | undefined;
  const form = useForm<genreData>({
    resolver: zodResolver(genreSchema),
    defaultValues: { name: detail?.name },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: genreData) =>
      detail === undefined ? createGenre(data) : editGenre(data, detail._id),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: genreData) => {
    try {
      await mutateAsync(data);
      navigate("/admin/genres");
      toast.success(
        `Genre berhasil ${detail === undefined ? "ditambahkan" : "diedit"}`
      );
    } catch (error) {
      console.log(error);
      toast.error(
        `Genre gagal ${detail === undefined ? "ditambahkan" : "diedit"}`
      );
    }
  };
  return { onSubmit, isPending, form, detail };
};

export default useGenreSubmit;
