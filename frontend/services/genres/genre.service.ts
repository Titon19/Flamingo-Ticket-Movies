import { privateInstance } from "../../lib/axiosInstance";
import type { Genre } from "./genre.type";
import { baseResponse, baseResponseWithPagination } from "../../types/response";
import { z } from "zod";
export const genreSchema = z.object({
  name: z.string().min(3, "Please input genre!"),
});

export type genreValue = z.infer<typeof genreSchema>;

export const getGenres = async (): Promise<
  baseResponseWithPagination<Genre[]>
> => {
  return await privateInstance.get("/admin/v1/genres");
};

export const getGenreParams = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page: number;
  limit: number;
  search?: string;
}): Promise<baseResponseWithPagination<Genre[]>> => {
  return await privateInstance.get("/admin/v1/genres", {
    params: {
      page,
      limit,
      search,
    },
  });
};

export const createGenre = async (
  data: genreValue
): Promise<baseResponse<Genre>> => {
  return await privateInstance.post("/admin/v1/genres", data);
};

export const editGenre = async (
  data: genreValue,
  id: string
): Promise<baseResponse<Genre>> => {
  return await privateInstance.put(`/admin/v1/genres/${id}`, data);
};

export const detailGenre = async (id: string): Promise<baseResponse<Genre>> => {
  return await privateInstance.get(`/admin/v1/genres/${id}`);
};
export const deleteGenre = async (id: string): Promise<baseResponse<Genre>> => {
  return await privateInstance.delete(`/admin/v1/genres/${id}`);
};
