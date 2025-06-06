import type { Genre } from "../genres/genre.type";
import { Theater } from "../theaters/theater.type";
export interface Movie {
  _id: string;
  title: string;
  genre: Pick<Genre, "name" | "_id">;
  thumbnail: string;
  thumbnailUrl: string;
  banner: string;
  bannerUrl: string;
  available: boolean;
  description: string;
  id: string;
}

export interface MovieExplore {
  filterMovies: Movie[];
  allMovies: Movie[];
}

export interface Seat {
  seat: string;
  isBooked: boolean;
}

export interface MovieDetails extends Movie {
  theaters: Theater[];
  price: number;
  available: boolean;
  description: string;
  bonus: string;
  seats: Seat[];
  times: string[];
}

export interface SelectedSeat {
  seat: string;
  _id: string;
}

export interface Balance {
  balance: number;
}

export interface WalletTopup {
  token: string;
  redirect_url: string;
}
