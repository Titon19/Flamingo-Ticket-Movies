import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  const SECRET_KEY = process.env.SECRET_KEY ?? "";
  return jwt.sign({ data: { id } }, SECRET_KEY, { expiresIn: "24h" });
};
