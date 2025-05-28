import express from "express";
import {
  deleteMovie,
  getMovieDetail,
  getMovies,
  postMovie,
  putMovie,
} from "../../controllers/movieController";
import multer from "multer";
import { imageFilter, uploadStorage } from "../../utils/multer";
const movieRoutes = express.Router();

const upload = multer({
  storage: uploadStorage(),
  fileFilter: imageFilter,
}).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "banner", maxCount: 1 },
]);

movieRoutes.get("/movies", getMovies);
movieRoutes.post("/movies", upload, postMovie);
movieRoutes.put("/movies/:id", upload, putMovie);
movieRoutes.delete("/movies/:id", deleteMovie);
movieRoutes.get("/movies/:id", getMovieDetail);

export default movieRoutes;
