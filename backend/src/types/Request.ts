import type { Request } from "express";

type User = {
  id: String;
  name: String;
  email: String;
  role: "admin" | "customer";
};

export interface CustomRequest extends Request {
  user?: User;
}
