// import { useForm } from "react-hook-form";
// import {
//   getTicketTransactions,
//   ticketFilterDateSchema,
//   type ticketFilterDate,
// } from "../../../../services/transactions/tickets/ticket.service";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { useLocation, useNavigate } from "react-router-dom";
// import { format } from "date-fns";
// const useFilterTicketByDate = () => {
//   const form = useForm<ticketFilterDate>({
//     resolver: zodResolver(ticketFilterDateSchema),
//     defaultValues: { start_date: new Date(), end_date: new Date() },
//   });

//   const { isPending, mutateAsync } = useMutation({
//     mutationFn: async (data: ticketFilterDate) => {
//       return await getTicketTransactions(1, 10, data);
//     },
//   });

//   const navigate = useNavigate();
//   const location = useLocation();

//   const onSubmit = async (data: ticketFilterDate) => {
//     try {
//       const result = await mutateAsync(data);

//       const searchParams = new URLSearchParams(location.search);

//       searchParams.set("start_date", format(data.start_date, "yyyy-MM-dd"));
//       searchParams.set("end_date", format(data.end_date, "yyyy-MM-dd"));
//       navigate(`filter?${searchParams.toString()}`);

//       // navigate(
//       //   `/admin/ticket-transactions/filter?start_date=${format(
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

// export default useFilterTicketByDate;
