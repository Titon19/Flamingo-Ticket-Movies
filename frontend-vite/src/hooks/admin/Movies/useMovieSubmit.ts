import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  createMovie,
  editMovie,
  movieData,
  movieSchema,
} from "../../../services/movies/movie.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useState } from "react";
import { Movie } from "../../../services/movies/movie.type";

const updateMovieSchema = movieSchema.partial({
  thumbnail: true,
});

const useMovieSubmit = () => {
  const { detail } = useLoaderData() as { detail: Movie | null };
  const form = useForm<movieData>({
    resolver: zodResolver(detail === null ? movieSchema : updateMovieSchema),
    defaultValues: {
      title: detail?.title || "",
      description: detail?.description || "",
      price: detail?.price ? detail.price.toString() : undefined,
      bonus: detail?.bonus || "",
      genre: detail?.genre._id || "",
      available: detail?.available || false,
      theaters:
        detail === null ? [] : detail.theaters.map((theater) => theater._id),
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) =>
      detail === null ? createMovie(data) : editMovie(data, detail._id),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: movieData) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      if (data.description) formData.append("description", data.description);
      formData.append("price", data.price.toString());
      if (data.bonus) formData.append("bonus", data.bonus);
      formData.append("genre", data.genre);
      formData.append("theaters", data.theaters.join(", "));
      formData.append("available", String(data.available ? "1" : "0"));
      if (data.thumbnail) formData.append("thumbnail", data.thumbnail);

      await mutateAsync(formData);

      navigate("/admin/movies");
      toast.success(
        `Movie berhasil ${detail === null ? "ditambahkan" : "diedit"}`
      );
    } catch (error) {
      console.log(error);
      toast.error(`Movie gagal ${detail === null ? "ditambahkan" : "diedit"}`);
    }
  };

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("thumbnail", file);

      const newPreview = URL.createObjectURL(file);

      setPreview(newPreview);
    }
  };

  const selectedTheaters = form.watch("theaters");

  const handleChangeTheater = (data: string) => {
    if (!selectedTheaters.includes(data)) {
      const newTheaters = [...selectedTheaters, data];
      form.setValue("theaters", newTheaters);
    }
  };

  const handleRemoveTheater = (data: string) => {
    const updatedTheaters = selectedTheaters.filter(
      (theater) => theater !== data
    );
    form.setValue("theaters", updatedTheaters);
  };
  return {
    onSubmit,
    isPending,
    form,
    handleFileChange,
    handleChangeTheater,
    handleRemoveTheater,
    selectedTheaters,
    preview,
  };
};

export default useMovieSubmit;
