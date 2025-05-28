import { z } from "zod";
import { globalInstance } from "../../lib/axiosInstance";
import type { baseResponse } from "../../types/response";
import { LoginResponse } from "./auth.type";
export const authSchema = z.object({
  name: z.string().min(3, "Please input name!"),
  email: z.string().email("Please input email!"),
  password: z.string().min(6, "Please input password minimum 6 chara!"),
  role: z.enum(["admin", "customer"]),
});
export const loginSchema = authSchema.omit({ name: true });
export const signUpSchema = authSchema
  .omit({ role: true })
  .extend({
    photo: z.any().refine((file: File) => file?.name, {
      message: "Please upload your photo!",
    }),
    confirmPassword: z
      .string()
      .min(6, "Please input confirm password minimum 6 chara!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must match!",
    path: ["confirmPassword"],
  });

export type LoginData = z.infer<typeof loginSchema>;
export type signUpData = z.infer<typeof signUpSchema>;

export const login = async (
  data: LoginData
): Promise<baseResponse<LoginResponse>> => {
  const response = await globalInstance.post("/auth/v1/login", data);
  return response.data;
};

export const signUp = async (
  data: FormData
): Promise<baseResponse<LoginResponse>> => {
  const response = await globalInstance.post("/auth/v1/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
