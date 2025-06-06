import express from "express";
import {
  getAvailableSeats,
  getGenres,
  getMovieDetails,
  getMovieFilter,
  getMovies,
  getSearchMovie,
} from "../../controllers/globalController";
import {
  getOrderDetail,
  getOrders,
  transactionTicket,
} from "../../controllers/ticketConctroller";
import { validateRequest } from "../../middlewares/validateRequest";
import { transactionSchema } from "../../utils/zodSchema";
import { getTheaters } from "../../controllers/theaterController";
import { getCities } from "../../controllers/cityController";

const globalRoutes = express.Router();

globalRoutes.get("/movies", getMovies);
globalRoutes.get("/movies/:id", getMovieDetails);
globalRoutes.get("/genres", getGenres);
globalRoutes.get("/check-seats/:movieId", getAvailableSeats);
globalRoutes.get("/browse-movies/:genreId", getMovieFilter);
globalRoutes.post(
  "/transaction/buy",
  validateRequest(transactionSchema),
  transactionTicket
);
globalRoutes.get("/orders", getOrders);
globalRoutes.get("/order-detail/:id", getOrderDetail);
globalRoutes.get("/theaters", getTheaters);
globalRoutes.get("/cities", getCities);
globalRoutes.get("/search-movies", getSearchMovie);

export default globalRoutes;
