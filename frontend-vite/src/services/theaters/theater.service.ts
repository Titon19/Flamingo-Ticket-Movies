import { z } from "zod";
import type {
  baseResponse,
  baseResponseWithPagination,
} from "../../types/response";
import type { Theater } from "./theater.type";
import { privateInstance } from "../../lib/axiosInstance";

export const theaterSchema = z.object({
  name: z.string().min(3, "Please input theater name!"),
  city: z.string({ required_error: "Please input city!" }),
});

export type theaterData = z.infer<typeof theaterSchema>;

export const getTheaters = async (): Promise<
  baseResponseWithPagination<Theater[]>
> => {
  return await privateInstance.get("/admin/v1/theaters");
};

export const getTheaterParams = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}): Promise<baseResponseWithPagination<Theater[]>> => {
  return await privateInstance.get("/admin/v1/theaters", {
    params: {
      page,
      limit,
      search,
    },
  });
};

export const createTheater = async (
  data: theaterData
): Promise<baseResponse<Theater>> => {
  const response = await privateInstance.post("/admin/v1/theaters", data);
  return response.data;
};

export const editTheater = async (
  data: theaterData,
  id: string
): Promise<baseResponse<Theater>> => {
  const response = await privateInstance.put(`/admin/v1/theaters/${id}`, data);
  return response.data;
};

export const detailTheater = async (
  id: string
): Promise<baseResponse<Theater>> => {
  const response = await privateInstance.get(`/admin/v1/theaters/${id}`);
  return response.data;
};

export const deleteTheater = async (
  id: string
): Promise<baseResponse<Theater>> => {
  return await privateInstance.delete(`/admin/v1/theaters/${id}`);
};

export const getCities = async () => {
  const response = await privateInstance.get("/admin/v1/cities");
  return response.data;
};
