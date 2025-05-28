import axios from "axios";
import { getSession } from "./utils";

const BASE_URL = import.meta.env.VITE_BASE_URL ?? "";

export const globalInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 3000,
});

export const privateInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 3000,
});

privateInstance.interceptors.request.use((config) => {
  const session = getSession();

  config.headers.Authorization = `Bearer ${session?.secretToken}`;

  return config;
});

privateInstance.interceptors.response.use((response) => response.data);
