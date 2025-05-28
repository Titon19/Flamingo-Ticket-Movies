import { z } from "zod";
import { baseResponse } from "../../types/response";
import { Profile } from "./profile.type";
import { privateInstance } from "../../lib/axiosInstance";

export const profileSchema = z.object({
  name: z.string().min(3, "Please input nama!"),
  email: z.string().email("Please input email!"),
});

export type profileData = z.infer<typeof profileSchema>;

export const editProfile = async (
  data: profileData,
  id: string
): Promise<baseResponse<Profile>> => {
  const response = await privateInstance.put(`/admin/v1/profile${id}`, data);
  return response.data;
};
