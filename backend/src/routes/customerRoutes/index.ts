import express from "express";
import globalRoutes from "./globalRoutes";
import { verifyRole, verifyToken } from "../../middlewares/verifyToken";
import walletRoutes from "./walletRoutes";
import profileRoutes from "./profileRoutes";

const customerRoutes = express.Router();

customerRoutes.use(verifyToken);
customerRoutes.use(verifyRole("customer"));
customerRoutes.use(globalRoutes);
customerRoutes.use(walletRoutes);
customerRoutes.use(profileRoutes);

export default customerRoutes;
