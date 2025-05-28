import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  editProfile,
  profileData,
  profileSchema,
} from "../../services/profile/profile.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Profile } from "../../services/profile/profile.type";

const useProfileSubmit = () => {
  const detail = useLoaderData() as Profile | undefined;
  const form = useForm<profileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: detail?.name, email: detail?.email },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: profileData) => editProfile(data, detail?._id || ""),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: profileData) => {
    try {
      await mutateAsync(data);
      navigate("/admin/profile");
      toast.success("Profile berhasil diedit");
    } catch (error) {
      console.log(error);
      toast.error("Profile gagal diedit");
    }
  };
  return { onSubmit, isPending, form };
};

export default useProfileSubmit;
