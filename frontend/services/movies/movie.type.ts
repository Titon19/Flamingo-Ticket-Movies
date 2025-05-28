import { Genre } from "../genres/genre.type";
import { Theater } from "../theaters/theater.type";

export interface Movie {
  _id: string;
  title: string;
  genre: Pick<Genre, "_id" | "name">;
  theaters: Pick<Theater, "_id" | "name">[];
  description: string;
  thumbnail: string;
  banner: string;
  price: number;
  available: boolean;
  bonus: string;
  thumbnailUrl: string;
  bannerUrl: string;
  id: string;
}
