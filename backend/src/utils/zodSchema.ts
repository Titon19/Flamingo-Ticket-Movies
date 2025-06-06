import { z } from "zod";

export const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

export const genreSchema = z
  .object({
    name: z.string().min(3),
  })
  .strict();

export const theaterSchema = z.object({
  name: z.string().min(3),
  city: z.string().min(3),
});

export const movieSchema = z
  .object({
    title: z.string().min(3),
    genre: z.string().min(3),
    available: z.boolean(),
    theaters: z.array(z.string().min(3)).min(1),
    thumbnail: z.string().min(3).nullable(),
    banner: z.string().min(3).nullable(),
    description: z.string(),
    price: z.number(),
    bonus: z.string().optional(),
  })
  .strict();

export const authSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "customer"]),
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

export const topupSchema = z.object({
  balance: z.number().min(1000),
});

export const transactionSchema = z
  .object({
    subtotal: z.number(),
    total: z.number(),
    bookingFee: z.number(),
    tax: z.number(),
    movieId: z.string(),
    theaterId: z.string(),
    seats: z.array(z.string()),
    date: z.string(),
  })
  .strict();

export const profileSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  photo: z
    .union([
      z
        .any()
        .refine((file) => file?.name, { message: "Please upload your photo!" }),
      z.string(),
    ])
    .optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "Please input password minimum 6 chara!"),
    confirmPassword: z
      .string()
      .min(6, "Please input confirm password minimum 6 chara!"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password and confirm password must match!",
    path: ["confirmPassword"],
  });
