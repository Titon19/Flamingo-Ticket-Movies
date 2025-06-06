"use client";
import CountCard from "@/components/Admin/CountCard";
import useFetchMovies from "@/hooks/admin/Movies/useFetchMovies";
import useFetchTicketTransactions from "@/hooks/admin/Transactions/Tickets/useFetchTicketTransactions";
import useFetchWalletTransactions from "@/hooks/admin/Transactions/Wallets/useFetchWalletTransactions";
import { Film, Ticket, Wallet } from "lucide-react";

export default function AdminDashboard() {
  const { data: Movies, isLoadingMovies } = useFetchMovies();
  const { data: ticketTransactions, isLoadingTicketTransactions } =
    useFetchTicketTransactions();
  const { data: walletTransactions, isLoadingWalletTransactions } =
    useFetchWalletTransactions();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <CountCard
          title={"Movies"}
          icon={<Film className="h-5 w-5 text-blue-600" />}
          items={Movies}
          isLoading={isLoadingMovies}
        />
        <CountCard
          title={"Ticket Transactions"}
          icon={<Ticket className="h-5 w-5 text-pink-600" />}
          items={ticketTransactions}
          isLoading={isLoadingTicketTransactions}
        />
        <CountCard
          title={"Wallet Transactions"}
          icon={<Wallet className="h-5 w-5 text-green-600" />}
          items={walletTransactions}
          isLoading={isLoadingWalletTransactions}
        />
      </div>
      <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
