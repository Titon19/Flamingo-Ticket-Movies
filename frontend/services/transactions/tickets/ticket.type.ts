import type { Customer } from "../../customers/customer.type";
import type { Movie } from "../../movies/movie.type";
import type { Theater } from "../../theaters/theater.type";

export interface TicketTransaction {
  _id: string;
  subtotal: number;
  total: number;
  bookingFee: number;
  tax: number;
  user: Pick<Customer, "name">;
  movie: Pick<Movie, "title">;
  theater: Pick<Theater, "name">;
  createdAt: string;
  updatedAt: string;
}
