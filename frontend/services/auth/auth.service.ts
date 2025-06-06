import { z } from "zod";
import { globalInstance, privateInstance } from "../../lib/axiosInstance";
import type { baseResponse } from "../../types/response";
import { LoginResponse } from "./auth.type";
import { ProfileResponse } from "../profile/profile.type";
export const authSchema = z.object({
  name: z.string().min(3, "Please input name!"),
  email: z.string().email("Please input email!"),
  password: z.string().min(6, "Please input password minimum 6 chara!"),
  confirmPassword: z.string().min(6, "Please input confirm password!"),
  role: z.enum(["admin", "customer"]),
});
export const loginSchema = authSchema.omit({
  name: true,
  confirmPassword: true,
});
export const signupSchema = authSchema
  .omit({ role: true })
  .extend({
    photo: z
      .union([
        z.any().refine((file) => file?.name, {
          message: "Please upload your photo!",
        }),
        z.string(),
      ])
      .optional(),
    confirmPassword: z
      .string()
      .min(6, "Please input confirm password minimum 6 chara!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must match!",
    path: ["confirmPassword"],
  });

export type LoginValue = z.infer<typeof loginSchema>;
export type SignupValue = z.infer<typeof signupSchema>;

export const login = async (
  data: LoginValue
): Promise<baseResponse<LoginResponse>> => {
  return await globalInstance.post("/auth/v1/login", data);
};

export const signUp = async (
  data: FormData
): Promise<baseResponse<LoginResponse>> => {
  return await globalInstance.post("/auth/v1/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const me = async (): Promise<
  baseResponse<Pick<ProfileResponse, "name" | "email" | "photoUrl" | "photo">>
> => {
  return await privateInstance.get("/auth/v1/me");
};

export const logout = async () => {
  return await globalInstance.post("/auth/v1/logout");
};
