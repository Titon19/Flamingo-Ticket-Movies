import {
  ChangeProfile,
  profileSchema,
  ProfileValue,
} from "@/services/profile/profile.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useFetchUserAuth } from "../../useFetchUserAuth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useChangeProfileSubmit = () => {
  const { data: meAuth, isLoading } = useFetchUserAuth();
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: meAuth?.name || "",
      email: meAuth?.email || "",
      photo: meAuth?.photoUrl || "",
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) => {
      return ChangeProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const onSubmit = async (data: ProfileValue) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);

      if (data.photo) {
        formData.append("photo", data.photo);
      }

      const response = await mutateAsync(formData);
      if (response.status === "Success") {
        toast.success(response.message || "Password changed successfully");
      } else {
        toast.error(response.message || "Password change failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const [preview, setPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue("photo", file);
      const newPreview = URL.createObjectURL(file);
      setPreview(newPreview);
    }
  };

  useEffect(() => {
    if (meAuth) {
      form.reset({
        name: meAuth.name || "",
        email: meAuth.email || "",
        photo: meAuth.photoUrl || null,
      });
    }

    if (meAuth?.photoUrl) {
      setPreview(meAuth?.photoUrl || meAuth?.photo);
    }
  }, [meAuth, form]);

  return {
    form,
    isPending,
    onSubmit,
    handlePhotoChange,
    preview,
    setPreview,
    isLoading,
  };
};

export default useChangeProfileSubmit;
