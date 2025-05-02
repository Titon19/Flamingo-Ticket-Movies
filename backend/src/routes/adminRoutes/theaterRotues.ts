import express from "express";
const theaterRoutes = express.Router();
import { theaterSchema } from "../../utils/zodSchema";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  deleteTheater,
  getTheaterDetail,
  getTheaters,
  postTheater,
  putTheater,
} from "../../controllers/theaterController";

theaterRoutes.get("/theaters", getTheaters);
theaterRoutes.post("/theaters", validateRequest(theaterSchema), postTheater);
theaterRoutes.put("/theaters/:id", validateRequest(theaterSchema), putTheater);
theaterRoutes.delete("/theaters/:id", deleteTheater);
theaterRoutes.get("/theaters/:id", getTheaterDetail);

export default theaterRoutes;
