import express from "express";
import genreRoutes from "./genreRoutes";
import theaterRoutes from "./theaterRotues";
import movieRoutes from "./movieRoutes";
import customerRoutes from "./customerRoutes";
import cityRoutes from "./cityRoutes";
import { verifyRole, verifyToken } from "../../middlewares/verifyToken";
import profileRoutes from "./profileRoutes";

const adminRoutes = express.Router();

adminRoutes.use(verifyToken);
adminRoutes.use(verifyRole("admin"));
adminRoutes.use(genreRoutes);
adminRoutes.use(theaterRoutes);
adminRoutes.use(movieRoutes);
adminRoutes.use(customerRoutes);
adminRoutes.use(cityRoutes);
adminRoutes.use(profileRoutes);

export default adminRoutes;
