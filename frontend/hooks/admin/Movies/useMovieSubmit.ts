"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Movie } from "@/services/movies/movie.type";
import { useEffect, useState } from "react";
import {
  createMovie,
  detailMovie,
  editMovie,
  movieSchema,
  type MovieValue,
} from "@/services/movies/movie.service";
import type { Genre } from "@/services/genres/genre.type";
import { getGenres } from "@/services/genres/genre.service";
import { Theater } from "@/services/theaters/theater.type";
import { getTheaters } from "@/services/theaters/theater.service";
import { toast } from "sonner";

const updateMovieSchema = movieSchema.partial({
  thumbnail: true,
  banner: true,
});

const useFetchMovieDetail = (itemId: string) => {
  const { data: detail, isLoading } = useQuery<Movie>({
    queryKey: ["detail-movie", itemId],
    queryFn: () => {
      return detailMovie(itemId!).then((res) => res.data);
    },
    enabled: !!itemId,
  });

  return { detail, isLoading };
};
const useGetGenresSelector = () => {
  const { data: genres, isLoading: genreSelectorLoading } = useQuery<Genre[]>({
    queryKey: ["genres-selector"],
    queryFn: async () => {
      return await getGenres().then((res) => res.data);
    },
  });

  return { genres, genreSelectorLoading };
};

const useGetTheaterSelector = () => {
  const { data: theaters, isLoading: theaterSelectorLoading } = useQuery<
    Theater[]
  >({
    queryKey: ["theaters-selector"],
    queryFn: async () => {
      return await getTheaters().then((res) => res.data);
    },
  });

  return { theaters, theaterSelectorLoading };
};

const useMovieSubmit = ({ itemId }: { itemId?: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [preview, setPreview] = useState<{
    thumbnail: string | null;
    banner: string | null;
  }>({
    thumbnail: null,
    banner: null,
  });

  const { detail, isLoading } = useFetchMovieDetail(itemId ?? "");
  const { genres, genreSelectorLoading } = useGetGenresSelector();
  const { theaters, theaterSelectorLoading } = useGetTheaterSelector();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) => {
      return itemId ? editMovie(data, itemId) : createMovie(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const form = useForm<MovieValue>({
    // resolver: zodResolver(itemId === null ? movieSchema : updateMovieSchema),
    resolver: zodResolver(itemId ? updateMovieSchema : movieSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      bonus: "",
      genre: detail?.genre._id || "",
      available: false,
      theaters: [],
    },
  });

  useEffect(() => {
    if (itemId && detail) {
      form.reset({
        title: detail.title,
        genre: detail.genre._id,
        available: detail.available,
        theaters: detail.theaters.map(({ _id }) => _id),
        description: detail.description,
        price: detail.price ? String(detail.price) : "",
        bonus: detail.bonus,
      });
    }
  }, [form, itemId, detail]);

  const onSubmit = async (data: MovieValue) => {
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
      if (data.banner) formData.append("banner", data.banner);

      const response = await mutateAsync(formData);
      if (response.status === "Success") {
        toast.success(response.message || "Password changed successfully");
      } else {
        toast.error(response.message || "Password change failed");
      }
      router.push("/admin/movies");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: "thumbnail" | "banner"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue(fieldName, file);

      const newPreview = URL.createObjectURL(file);

      if (fieldName === "thumbnail") {
        setPreview((prev) => ({ ...prev, thumbnail: newPreview }));
      } else {
        setPreview((prev) => ({ ...prev, banner: newPreview }));
      }
    }
  };
  // const handleFileBannerChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];

  //   if (file) {
  //     form.setValue("banner", file);

  //     const newPreview = URL.createObjectURL(file);

  //     setPreview(newPreview);
  //   }
  // };

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
    detail,
    onSubmit,
    isPending,
    isLoading,
    form,
    handleChangeTheater,
    handleRemoveTheater,
    handleFileChange,
    preview,
    selectedTheaters,
    genres,
    genreSelectorLoading,
    theaters,
    theaterSelectorLoading,
  };
};

export default useMovieSubmit;
