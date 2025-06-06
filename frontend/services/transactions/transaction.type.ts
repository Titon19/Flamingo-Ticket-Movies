import type { Seat } from "../global/global.type";
import type { Theater } from "../theaters/theater.type";
export interface Movie {
  id: string;
  title: string;
  thumbnail: string;
  genre: string;
  price: number;
  bonus: string;
}
export interface Transaction {
  _id: string;
  movie: Movie;
  theater: Pick<Theater, "name" | "city">;
  date: string;
  seats: Pick<Seat, "seat">[];
  thumbnailUrl: string;
  subtotal: number;
  tax: number;
  bookingFee: number;
  total: number;
}
