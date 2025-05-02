import type { Genre } from "../genres/genre.type";

export interface Movie {
  _id: string;
  title: string;
  genre: Pick<Genre, "name">;
  thumbnail: string;
  thumbnailUrl: string;
  id: string;
}
