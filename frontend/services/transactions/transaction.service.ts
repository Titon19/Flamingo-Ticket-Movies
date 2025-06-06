import type { baseResponse } from "@/types/response";
import type { Transaction } from "./transaction.type";
import { privateInstance } from "@/lib/axiosInstance";

export const getOrders = async (): Promise<baseResponse<Transaction[]>> => {
  return await privateInstance.get("/customer/v1/orders");
};

export const getOrderDetail = async (
  id: string
): Promise<baseResponse<Transaction>> => {
  return await privateInstance.get(`/customer/v1/order-detail/${id}`);
};
