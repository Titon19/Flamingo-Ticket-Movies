"use client";

import ChoosedTheaterCard from "@/components/Customer/MyTicket/ChoosedTheaterCard";
import CardDetailHorizontal from "@/components/Customer/MyTicket/detail/CardDetailHorizontal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import { getOrderDetail } from "@/services/transactions/transaction.service";
import { Transaction } from "@/services/transactions/transaction.type";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  BadgeDollarSign,
  Clock,
  Coffee,
  DollarSign,
  Film,
  PercentCircle,
  Popcorn,
  Sheet,
  ShoppingBag,
  Table,
  User2,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import React from "react";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { data: OrderDetail, isLoading: isLoadingOrderDetail } =
    useQuery<Transaction>({
      queryKey: ["order-detail", id],
      queryFn: () => getOrderDetail(id as string).then((res) => res.data),
    });

  console.log("OrderDetail", OrderDetail);

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-8">
        <Button asChild size="icon" className="rounded-full">
          <Link href={`/my-ticket`}>
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-md md:text-lg lg:text-xl font-bold">
          Order Detail
        </h1>
        <ShoppingBag />
      </div>

      <div className="flex flex-col gap-3 justify-center mb-8">
        <CardDetailHorizontal orderDetail={OrderDetail as Transaction} />
        <ChoosedTheaterCard
          theater={OrderDetail as Transaction}
          isLoading={isLoadingOrderDetail}
        />

        {/* Details */}
        <Card className="p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h1 className="text-md md:text-lg lg:text-xl font-bold">
                  Order Details
                </h1>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3 mt-4">
                  <h1 className="text-md md:text-lg lg:text-xl font-bold">
                    Ticket Details
                  </h1>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <Film /> Movie
                      </p>
                      <p className="text-md md:text-lg">
                        {OrderDetail?.movie.title}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <Clock />
                        Time
                      </p>
                      <p className="text-md md:text-lg">{OrderDetail?.date}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <User2 />
                        Quantity
                      </p>
                      <p className="text-md md:text-lg">
                        {OrderDetail?.seats?.length} Seats
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <Table />
                        Seats
                      </p>
                      <p className="text-md md:text-lg">
                        {OrderDetail?.seats.map((seat) => seat.seat).join(", ")}{" "}
                        Seats
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <Popcorn />
                        Bonus
                      </p>
                      <p className="text-md md:text-lg">Popcorn</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <DollarSign />
                        Price
                      </p>
                      <p className="text-md md:text-lg">
                        {formatRupiah(OrderDetail?.movie.price as number)}/
                        Orang
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <BadgeDollarSign />
                        Sub Total
                      </p>
                      <p className="text-md md:text-lg">
                        {formatRupiah(OrderDetail?.subtotal as number)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <PercentCircle />
                        PPN 11%
                      </p>
                      <p className="text-md md:text-lg">
                        {formatRupiah(OrderDetail?.tax as number)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <Sheet />
                        Booking Fee
                      </p>
                      <p className="text-md md:text-lg">
                        {formatRupiah(OrderDetail?.bookingFee as number)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <Wallet />
                        Total
                      </p>
                      <p className="text-md md:text-lg font-bold">
                        {formatRupiah(OrderDetail?.total as number)}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
      <div className="mt-8 flex gap-3 flex-col">
        <h1 className="text-md md:text-lg lg:text-xl font-bold">Bonus</h1>

        <Card className="p-4 w-fit font-bold">
          <div className="flex items-center gap-3">
            <Popcorn className="w-8 h-8" />
            <div className="flex flex-col gap-3">
              <p className="text-center flex items-center gap-3">
                {OrderDetail?.movie.bonus} Salt
              </p>
              <Badge className="text-center flex items-center gap-3 ">
                <Coffee className="w-4 h-4" />
                Snack
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default OrderDetailPage;
