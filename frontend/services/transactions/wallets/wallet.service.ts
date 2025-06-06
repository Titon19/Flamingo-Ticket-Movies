import { privateInstance } from "../../../lib/axiosInstance";
import { baseResponseWithPagination } from "../../../types/response";
import { WalletTransaction } from "./wallet.type";

// export const WalletTransactionSchema = z.object({
//   start_date: z.date().optional(),
//   end_date: z.date().optional(),
// });

// export type walletFilterDate = z.infer<typeof WalletTransactionSchema>;

// export const getWalletTransactions = async (): Promise<
//   baseResponse<WalletTransaction[]>
// > => {
//   const response = await privateInstance.get("/admin/v1/wallet-transactions");
//   return response.data;
// };

export const getWalletTransactions = async ({
  page,
  limit,
  filter,
}: {
  page: number;
  limit: number;
  filter?: {
    start_date: string;
    end_date: string;
  };
}): Promise<baseResponseWithPagination<WalletTransaction[]>> => {
  return await privateInstance.get("/admin/v1/wallet-transactions", {
    params: {
      page,
      limit,
      start_date: filter?.start_date,
      end_date: filter?.end_date,
    },
  });
};
