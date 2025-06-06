import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { privateInstance } from "@/lib/axiosInstance";
import type { baseResponse } from "@/types/response";
import type { ChangePassword } from "./change-password.type";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "Please input password minimum 6 chara!"),
    confirmPassword: z
      .string()
      .min(6, "Please input confirm password minimum 6 chara!"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match!",
    path: ["confirmPassword"],
  });

export const changePasswordResolver = zodResolver(changePasswordSchema);

export type changePasswordValue = z.infer<typeof changePasswordSchema>;

export const changePassword = async (
  data: changePasswordValue
): Promise<baseResponse<ChangePassword>> => {
  return await privateInstance.put("/admin/v1/change-password", data);
};
