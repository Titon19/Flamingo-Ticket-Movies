import { privateInstance } from "../../lib/axiosInstance";
import type { baseResponse } from "../../types/response";
import type { Movie, MovieExplore } from "./public.type";
import { Genre } from "../genres/genre.type";
import { City, Theater } from "../theaters/theater.type";
import { filterState } from "@/redux/features/filter/filterSlice";

export const getMovies = async (): Promise<baseResponse<Movie[]>> => {
  return await privateInstance.get("/public/v1/movies");
};

export const getGenres = async (): Promise<
  baseResponse<Pick<Genre, "_id" | "name">[]>
> => {
  return await privateInstance.get("/public/v1/genres");
};

export const getTheaters = async (): Promise<
  baseResponse<Pick<Theater, "_id" | "name">[]>
> => {
  return await privateInstance.get("/public/v1/theaters");
};

export const getCities = async (): Promise<baseResponse<City[]>> => {
  return await privateInstance.get("/public/v1/cities");
};

export const getMovieByGenre = async (
  genreId: string,
  params?: filterState
): Promise<baseResponse<MovieExplore>> => {
  return await privateInstance.get(`/public/v1/browse-movies/${genreId}`, {
    params: params,
  });
};

export const getMovieDetails = async (
  movieId: string
): Promise<baseResponse<Movie>> => {
  return await privateInstance.get(`/public/v1/movies/${movieId}`);
};

export const getSearchMovies = async (
  search: string
): Promise<baseResponse<Movie[]>> => {
  return await privateInstance.get(`/public/v1/search-movies`, {
    params: { search },
  });
};
