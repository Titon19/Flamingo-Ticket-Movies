import express from "express";
import { login, register, logout, me } from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";
import { authSchema } from "../utils/zodSchema";
import multer from "multer";
import { imageFilter, uploadStorage } from "../utils/multer";
import { verifyToken } from "../middlewares/verifyToken";

const authRoutes = express.Router();

const upload = multer({
  storage: uploadStorage(),
  fileFilter: imageFilter,
});

authRoutes.post(
  "/login",
  validateRequest(authSchema.omit({ name: true })),
  login
);
authRoutes.post("/register", upload.single("photo"), register);
authRoutes.get("/me", verifyToken, me);
authRoutes;

authRoutes.post("/logout", verifyToken, logout);
export default authRoutes;
