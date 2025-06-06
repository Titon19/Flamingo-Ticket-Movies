"use client";
import CardHorizontal from "@/components/Customer/MyTicket/CardHorizontal/CardHorizontal";
import { Button } from "@/components/ui/button";
import { getOrders } from "@/services/transactions/transaction.service";
import type { Transaction } from "@/services/transactions/transaction.type";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Ticket } from "lucide-react";
import Link from "next/link";
import React from "react";

const TicketTransactionPage = () => {
  const { data: orders, isLoading: isLoadingOrders } = useQuery<Transaction[]>({
    queryKey: ["orders"],
    queryFn: () => getOrders().then((res) => res.data),
  });

  console.log("orders", orders);
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-8">
        <Button asChild size="icon" className="rounded-full">
          <Link href={"/"}>
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-md md:text-lg lg:text-xl font-bold">My Ticket</h1>
        <Ticket />
      </div>
      <div>
        <CardHorizontal orders={orders || []} isLoading={isLoadingOrders} />
      </div>
    </section>
  );
};

export default TicketTransactionPage;
