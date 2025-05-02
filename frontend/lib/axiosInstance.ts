import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export const globalInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  // timeout: 3000,
});

export const privateInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  // timeout: 3000,
});

privateInstance.interceptors.response.use((response) => response.data);
