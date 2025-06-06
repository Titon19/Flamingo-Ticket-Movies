import { z } from "zod";
import type {
  baseResponse,
  baseResponseWithPagination,
} from "../../types/response";
import type { Movie } from "./movie.type";
import { privateInstance } from "../../lib/axiosInstance";

export const movieSchema = z.object({
  title: z.string().min(3, "Please input judul!"),
  genre: z.string().min(3, "Please input genre!"),
  available: z.boolean().optional(),
  theaters: z.array(z.string().min(3)).min(1, "Please choose theater!"),
  thumbnail: z.any().refine((file: File) => file?.name, {
    message: "Please upload thumbnail!",
  }),
  banner: z.any().refine((file: File) => file?.name, {
    message: "Please upload banner!",
  }),
  description: z.string().min(3, "Please input description!"),
  price: z.string().min(1, "Please input harga!"),
  bonus: z.string().optional(),
});

export type MovieValue = z.infer<typeof movieSchema>;

export const getMovies = async (): Promise<
  baseResponseWithPagination<Movie[]>
> => {
  return await privateInstance.get("/admin/v1/movies");
};

export const getMovieParams = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}): Promise<baseResponseWithPagination<Movie[]>> => {
  return await privateInstance.get("/admin/v1/movies", {
    params: {
      page,
      limit,
      search,
    },
  });
};

export const createMovie = async (
  data: FormData
): Promise<baseResponse<Movie>> => {
  return await privateInstance.post("/admin/v1/movies", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editMovie = async (
  data: FormData,
  id: string
): Promise<baseResponse<Movie>> => {
  return await privateInstance.put(`/admin/v1/movies/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const detailMovie = async (id: string): Promise<baseResponse<Movie>> => {
  return await privateInstance.get(`/admin/v1/movies/${id}`);
};

export const deleteMovie = async (id: string): Promise<baseResponse<Movie>> => {
  return await privateInstance.delete(`/admin/v1/movies/${id}`);
};
