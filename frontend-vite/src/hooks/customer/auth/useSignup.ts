import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  signUp,
  signUpData,
  signUpSchema,
} from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useSignup = () => {
  const form = useForm<signUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) => {
      return signUp(data);
    },
  });

  const onSubmit = async (data: signUpData) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.photo) {
        formData.append("photo", data.photo);
      }

      await mutateAsync(formData);
      navigate("/sign-in");
      toast.success(
        "Sign up success! Please login with your email and password."
      );
    } catch (error) {
      console.log(error);
      toast.error("Sign up failed!, please try again.");
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

  return { onSubmit, form, handlePhotoChange, preview, setPreview, isPending };
};

export default useSignup;
