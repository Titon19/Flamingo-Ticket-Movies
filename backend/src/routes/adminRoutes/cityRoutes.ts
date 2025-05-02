import express from "express";
import { getCities } from "../../controllers/cityController";
const cityRoutes = express.Router();

cityRoutes.get("/cities", getCities);

export default cityRoutes;
