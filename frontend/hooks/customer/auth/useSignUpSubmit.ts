import {
  signUp,
  signupSchema,
  SignupValue,
} from "@/services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useSignUpSubmit = () => {
  const form = useForm<SignupValue>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      photo: "default.png",
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) => {
      return signUp(data);
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SignupValue) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.photo) {
        formData.append("photo", data.photo);
      }
      formData.append("confirmPassword", data.confirmPassword);
      const response = await mutateAsync(formData);
      if (response.status === "Success") {
        router.push("/auth/sign-in");
        toast.success(
          response.message ||
            "Sign up success! Please login with your email and password."
        );
      } else {
        toast.error(response.message || "Sign up failed!, please try again.");
      }
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
  return { form, onSubmit, isPending, handlePhotoChange, preview, setPreview };
};

export default useSignUpSubmit;
