import { privateInstance } from "../../lib/axiosInstance";
import type { baseResponse } from "../../types/response";
import { z } from "zod";
import type { Movie } from "./global.type";
import { Genre } from "../genres/genre.type";

export const getMovies = async (): Promise<baseResponse<Movie[]>> => {
  const response = await privateInstance.get("/customer/v1/movies");
  return response.data;
};

export const getGenres = async (): Promise<
  baseResponse<Pick<Genre, "_id" | "name">[]>
> => {
  const response = await privateInstance.get("/customer/v1/genres");
  console.log(response);
  return response.data;
};
