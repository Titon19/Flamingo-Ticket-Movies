import { Customer } from "./customer.type";
import { baseResponseWithPagination } from "../../types/response";
import { privateInstance } from "../../lib/axiosInstance";

export const getCustomers = async (): Promise<
  baseResponseWithPagination<Customer[]>
> => {
  return await privateInstance.get("/admin/v1/customers");
};
export const getCustomerParams = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}): Promise<baseResponseWithPagination<Customer[]>> => {
  return await privateInstance.get("/admin/v1/customers", {
    params: {
      page,
      limit,
      search,
    },
  });
};
