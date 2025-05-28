import { privateInstance } from "../../lib/axiosInstance";
import type { Genre } from "./genre.type";
import { baseResponse, baseResponseWithPagination } from "../../types/response";
import { z } from "zod";
export const genreSchema = z.object({
  name: z.string().min(3, "Please input genre!"),
});

export type genreData = z.infer<typeof genreSchema>;

export const getGenres = async (): Promise<
  baseResponseWithPagination<Genre[]>
> => {
  const response = await privateInstance.get("/admin/v1/genres");
  return response.data;
};

export const getGenreParams = async ({
  page,
  limit,
  search,
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
  data: genreData
): Promise<baseResponse<Genre>> => {
  const response = await privateInstance.post("/admin/v1/genres", data);
  return response.data;
};

export const editGenre = async (
  data: genreData,
  id: string
): Promise<baseResponse<Genre>> => {
  const response = await privateInstance.put(`/admin/v1/genres/${id}`, data);
  return response.data;
};

export const detailGenre = async (id: string): Promise<baseResponse<Genre>> => {
  const response = await privateInstance.get(`/admin/v1/genres/${id}`);
  return response.data;
};
export const deleteGenre = async (id: string): Promise<baseResponse<Genre>> => {
  return await privateInstance.delete(`/admin/v1/genres/${id}`);
};
