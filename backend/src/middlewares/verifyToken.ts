import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import type { CustomRequest } from "../types/Request";

type JWTPayload = {
  data: {
    id: string;
  };
};

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const secretKey = process.env.SECRET_KEY ?? "";
  const authHeader = req.headers?.authorization;
  const tokenCookie = req.cookies.secretToken;
  const token = authHeader?.split(" ")[1] || tokenCookie;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JWTPayload;
    const user = await User.findById(decoded.data.id);

    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export const verifyRole =
  (type: "admin" | "customer") =>
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req?.user?.role !== type) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  };
