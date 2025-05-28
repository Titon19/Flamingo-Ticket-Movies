// import { useForm } from "react-hook-form";
// import {
//   getFilteredWalletTransactions,
//   WalletTransactionSchema,
//   type walletFilterDate,
// } from "../../services/transactions/wallets/wallet.service";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { useLocation, useNavigate } from "react-router-dom";
// import { format } from "date-fns";
// const useFilterWalletByDate = () => {
//   const form = useForm<walletFilterDate>({
//     resolver: zodResolver(WalletTransactionSchema),
//     defaultValues: { start_date: new Date(), end_date: new Date() },
//   });

//   const { isPending, mutateAsync } = useMutation({
//     mutationFn: async (data: walletFilterDate) => {
//       return await getFilteredWalletTransactions(data);
//     },
//   });

//   const navigate = useNavigate();
//   const location = useLocation();

//   const onSubmit = async (data: walletFilterDate) => {
//     try {
//       const result = await mutateAsync(data);

//       const searchParams = new URLSearchParams(location.search);
//       searchParams.set("start_date", format(data.start_date, "yyyy-MM-dd"));
//       searchParams.set("end_date", format(data.end_date, "yyyy-MM-dd"));
//       navigate(`?${searchParams.toString()}`);
//       // navigate(
//       //   `/admin/wallet-transactions/filter?start_date=${format(
//       //     data.start_date,
//       //     "yyyy-MM-dd"
//       //   )}&end_date=${format(data.end_date, "yyyy-MM-dd")}`
//       // );
//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return { onSubmit, isPending, form };
// };

// export default useFilterWalletByDate;
