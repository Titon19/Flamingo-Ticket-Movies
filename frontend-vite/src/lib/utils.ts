import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { LoginResponse } from "../services/auth/auth.type";
import secureLocalStorage from "react-secure-storage";
import dayjs from "dayjs";

export const SESSION_KEY = "SESSION_KEY";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSession = () => {
  const session = secureLocalStorage.getItem(SESSION_KEY) as LoginResponse;

  if (!session) return null;
  return session;
};

export const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatTanggal = (
  date: Date | string,
  format = "DD-MM-YYYY HH:mm"
) => {
  return dayjs(date).format(format);
};
