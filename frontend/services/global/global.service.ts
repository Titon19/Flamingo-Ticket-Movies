import { privateInstance } from "../../lib/axiosInstance";
import type { baseResponse } from "../../types/response";
import type {
  Balance,
  Movie,
  MovieExplore,
  SelectedSeat,
  WalletTopup,
} from "./global.type";
import { Genre } from "../genres/genre.type";
import { City, Theater } from "../theaters/theater.type";
import { filterState } from "@/redux/features/filter/filterSlice";

import { z } from "zod";
import { WalletTransaction } from "../transactions/wallets/wallet.type";

export const filterSchema = z.object({
  genre: z.string(),
  city: z.string().optional(),
  availability: z.string().optional(),
  theaters: z.array(z.string()),
});

export type FilterValues = z.infer<typeof filterSchema>;

export const transactionSchema = z
  .object({
    subtotal: z.number(),
    total: z.number(),
    bookingFee: z.number(),
    tax: z.number(),
    movieId: z.string(),
    theaterId: z.string(),
    seats: z.array(z.string()),
    date: z.string(),
  })
  .strict();

export type TransactionValues = z.infer<typeof transactionSchema>;

export const getMovies = async (): Promise<baseResponse<Movie[]>> => {
  return await privateInstance.get("/customer/v1/movies");
};

export const getGenres = async (): Promise<
  baseResponse<Pick<Genre, "_id" | "name">[]>
> => {
  return await privateInstance.get("/customer/v1/genres");
};

export const getTheaters = async (): Promise<
  baseResponse<Pick<Theater, "_id" | "name">[]>
> => {
  return await privateInstance.get("/customer/v1/theaters");
};

export const getCities = async (): Promise<baseResponse<City[]>> => {
  return await privateInstance.get("/customer/v1/cities");
};

export const getMovieByGenre = async (
  genreId: string,
  params?: filterState
): Promise<baseResponse<MovieExplore>> => {
  return await privateInstance.get(`/customer/v1/browse-movies/${genreId}`, {
    params: params,
  });
};

export const getMovieDetails = async (
  movieId: string
): Promise<baseResponse<Movie>> => {
  return await privateInstance.get(`/customer/v1/movies/${movieId}`);
};

export const checkSeats = async (
  movieId: string,
  date: string
): Promise<baseResponse<SelectedSeat[]>> => {
  return await privateInstance.get(`/customer/v1/check-seats/${movieId}`, {
    params: { date },
  });
};

export const getBalance = async (): Promise<baseResponse<Balance>> => {
  return await privateInstance.get("/customer/v1/check-balance");
};

export const buyTicket = async (
  data: TransactionValues
): Promise<baseResponse<TransactionValues>> => {
  return await privateInstance.post("/customer/v1/transaction/buy", data);
};

export const getTopopHistory = async (): Promise<
  baseResponse<WalletTransaction[]>
> => {
  return await privateInstance.get("/customer/v1/topup-history");
};

export const walletTopupSchema = z.object({
  balance: z.number(),
});

export type WalletTopupValue = z.infer<typeof walletTopupSchema>;
export const walletTopop = async (
  data: WalletTopupValue
): Promise<baseResponse<WalletTopup>> => {
  return await privateInstance.post("/customer/v1/topup", data);
};

export const getSearchMovies = async (
  search: string
): Promise<baseResponse<Movie[]>> => {
  return await privateInstance.get(`/customer/v1/search-movies`, {
    params: { search },
  });
};
