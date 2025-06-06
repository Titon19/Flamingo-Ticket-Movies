import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./utils/database";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import publicRoutes from "./routes/publicRoutes";

dotenv.config();

const app: Express = express();
const { PORT } = process.env;
const { CLIENT_URL } = process.env;
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(express.static("public"));
connectDB();

app.use("/api/admin/v1", adminRoutes);
app.use("/api/auth/v1", authRoutes);
app.use("/api/customer/v1", customerRoutes);
app.use("/api/public/v1", publicRoutes);

app.listen(PORT, () => {
  console.log(`app listening on port http://localhost:${PORT}`);
});
