import express from "express";

import multer from "multer";
import { imageFilter, photoStorage } from "../../utils/multer";
import {
  ChangePassword,
  ChangeProfile,
} from "../../controllers/profileController";

const profileRoutes = express.Router();

const upload = multer({
  storage: photoStorage("public/uploads/photos"),
  fileFilter: imageFilter,
});
profileRoutes.put("/profile", upload.single("photo"), ChangeProfile);
profileRoutes.put("/change-password", ChangePassword);
export default profileRoutes;
