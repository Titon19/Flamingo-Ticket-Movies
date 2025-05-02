import express from "express";
import {
  deleteMovie,
  getMovieDetail,
  getMovies,
  postMovie,
  putMovie,
} from "../../controllers/movieController";
import multer from "multer";
import { imageFilter, thumbnailStorage } from "../../utils/multer";
const movieRoutes = express.Router();

const upload = multer({ storage: thumbnailStorage(), fileFilter: imageFilter });

movieRoutes.get("/movies", getMovies);
movieRoutes.post("/movies", upload.single("thumbnail"), postMovie);
movieRoutes.put("/movies/:id", upload.single("thumbnail"), putMovie);
movieRoutes.delete("/movies/:id", deleteMovie);
movieRoutes.get("/movies/:id", getMovieDetail);

export default movieRoutes;
