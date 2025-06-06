import { z } from "zod";
import { baseResponse } from "../../types/response";
import { Profile } from "./profile.type";
import { privateInstance } from "../../lib/axiosInstance";

export const profileSchema = z.object({
  name: z.string().min(3, "Please input nama!"),
  email: z.string().email("Please input email!"),
  photo: z
    .union([
      z
        .any()
        .refine((file) => file?.name, { message: "Please upload your photo!" }),
      z.string(),
    ])
    .optional(),
});

export type ProfileValue = z.infer<typeof profileSchema>;

export const ChangeProfile = async (
  data: FormData
): Promise<baseResponse<Profile>> => {
  return await privateInstance.put("/admin/v1/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const ChangeProfileCustomer = async (
  data: FormData
): Promise<baseResponse<Profile>> => {
  return await privateInstance.put("/customer/v1/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
