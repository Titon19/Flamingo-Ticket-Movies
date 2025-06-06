import express from "express";

import {
  getGenres,
  getMovieDetails,
  getMovieFilter,
  getMovies,
  getSearchMovie,
} from "../controllers/globalController";
import { getTheaters } from "../controllers/theaterController";
import { getCities } from "../controllers/cityController";

const publicRoutes = express.Router();

publicRoutes.get("/movies", getMovies);
publicRoutes.get("/movies/:id", getMovieDetails);
publicRoutes.get("/genres", getGenres);
publicRoutes.get("/browse-movies/:genreId", getMovieFilter);
publicRoutes.get("/theaters", getTheaters);
publicRoutes.get("/cities", getCities);
publicRoutes.get("/search-movies", getSearchMovie);

export default publicRoutes;
