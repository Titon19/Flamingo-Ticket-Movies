export interface Theater {
  _id: string;
  name: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  movies: string[];
}

export interface City {
  id: string;
  name: string;
  province_id: string;
}
