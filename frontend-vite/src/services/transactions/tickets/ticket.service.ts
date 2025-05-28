import { z } from "zod";
import { privateInstance } from "../../../lib/axiosInstance";
import type { TicketTransaction } from "./ticket.type";
import { baseResponseWithPagination } from "../../../types/response";

export const ticketFilterDateSchema = z.object({
  start_date: z.date().optional(),
  end_date: z.date().optional(),
});

export type ticketFilterDate = z.infer<typeof ticketFilterDateSchema>;

// export const getTicketTransactions = async (
//   page: number,
//   limit: number
// ): Promise<baseResponseWithPagination<TicketTransaction[]>> => {
//   return await privateInstance.get("/admin/v1/ticket-transactions", {
//     params: {
//       page,
//       limit,
//     },
//   });
// };

export const getTicketTransactions = async ({
  page,
  limit,
  data,
}: {
  page: number;
  limit: number;
  data?: ticketFilterDate;
}): Promise<baseResponseWithPagination<TicketTransaction[]>> => {
  return await privateInstance.get("/admin/v1/ticket-transactions", {
    params: {
      page,
      limit,
      start_date: data?.start_date,
      end_date: data?.end_date,
    },
  });
};
