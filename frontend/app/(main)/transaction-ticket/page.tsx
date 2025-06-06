"use client";
import CardHorizontal from "@/components/Customer/IndexDetails/CardHorizontal/CardHorizontal";
import ChoosedTheaterCard from "@/components/Customer/IndexDetails/ChoosedTheaterCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import useBalance from "@/hooks/customer/transaction-ticket/useBalance";
import { useFetchUserAuth } from "@/hooks/useFetchUserAuth";
import { formatRupiah } from "@/lib/utils";
import {
  setStep,
  Ticket as TicketType,
} from "@/redux/features/ticket/ticketSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  buyTicket,
  getBalance,
  transactionSchema,
  TransactionValues,
} from "@/services/global/global.service";
import { MovieDetails } from "@/services/global/global.type";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowLeft,
  BadgeDollarSign,
  Clock,
  DollarSign,
  Film,
  PercentCircle,
  Popcorn,
  Sheet,
  Table,
  User2,
  Wallet,
  Wallet2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const TransactionTicket = () => {
  const dispatch = useAppDispatch();
  const { movie, detail } = useAppSelector((state) => state.ticket);
  const { data: meAuth } = useFetchUserAuth();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const route = useRouter();

  const { dataBalance, isLoadingBalance } = useBalance();

  const detailPrice = useMemo(() => {
    if (!movie && !detail) {
      return {
        subtotal: 0,
        ppn: 0,
        bookingFee: 0,
        total: 0,
      };
    }

    const subtotal =
      (movie?.price ?? 0) * (detail?.seat?.split(",").length ?? 0);
    const ppn = (subtotal * 11) / 100;
    const bookingFee = 3000;
    const total = subtotal + ppn + bookingFee;

    return {
      subtotal,
      ppn,
      bookingFee,
      total,
    };
  }, [movie, detail]);

  const isBalanceEnough = (dataBalance?.balance ?? 0) > detailPrice.total;

  useEffect(() => {
    if (!movie && !detail) {
      return route.push("/");
    }
  }, [movie, detail, route]);

  if (!movie && !detail) {
    return null;
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: TransactionValues) => buyTicket(data),
  });

  const handleTransaction = async () => {
    if (!isChecked) {
      toast.error("Silakan centang kotak persetujuan terlebih dahulu.");
      return;
    }
    try {
      const parse = transactionSchema.parse({
        subtotal: detailPrice.subtotal,
        total: detailPrice.total,
        bookingFee: detailPrice.bookingFee,
        tax: detailPrice.ppn,
        movieId: movie?._id ?? "",
        theaterId: detail?.theater?._id ?? "",
        seats: detail?.seat?.split(",") ?? [],
        date: detail?.time ?? "",
      });

      await mutateAsync(parse);
      dispatch(setStep({ step: "DETAIL" }));
      route.push("/transaction-ticket/success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-8">
        <Button asChild size="icon" className="rounded-full">
          <Link href={`/details/${movie?._id}`}>
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-md md:text-lg lg:text-xl font-bold">
          Ticket Payment
        </h1>
        <Wallet />
      </div>

      <div className="flex flex-col gap-3 justify-center mb-8">
        <CardHorizontal movie={movie as MovieDetails} />
        <ChoosedTheaterCard detail={detail as TicketType} />

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
                      <p className="text-md md:text-lg">{movie?.title}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <Clock />
                        Time
                      </p>
                      <p className="text-md md:text-lg">{detail?.time}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <User2 />
                        Quantity
                      </p>
                      <p className="text-md md:text-lg">
                        {detail?.seat?.split(",").length} Seats
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <Table />
                        Seats
                      </p>
                      <p className="text-md md:text-lg">{detail?.seat} Seats</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <Popcorn />
                        Bonus
                      </p>
                      <p className="text-md md:text-lg">{movie?.bonus}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <DollarSign />
                        Price
                      </p>
                      <p className="text-md md:text-lg">
                        {formatRupiah(movie?.price as number)}/ Orang
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <BadgeDollarSign />
                        Sub Total
                      </p>
                      <p className="text-md md:text-lg">
                        {formatRupiah(detailPrice?.subtotal as number)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <PercentCircle />
                        PPN 11%
                      </p>
                      <p className="text-md md:text-lg">
                        {formatRupiah(detailPrice?.ppn as number)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <Sheet />
                        Booking Fee
                      </p>
                      <p className="text-md md:text-lg">
                        {formatRupiah(detailPrice?.bookingFee as number)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-md md:text-lg flex gap-2 items-center">
                        <Wallet />
                        Total
                      </p>
                      <p className="text-md md:text-lg">
                        {formatRupiah(detailPrice?.total as number)}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Saldo */}
        <Card className="bg-green-950">
          <CardHeader>
            <CardTitle className="font-bold text-xl md:text-2xl lg:text-3xl flex items-center gap-3">
              <Wallet2Icon className="w-8 h-8" /> Saldo
            </CardTitle>
            <CardDescription>
              {isLoadingBalance ? (
                "..."
              ) : (
                <p className="font-bold text-xl md:text-2xl lg:text-3xl text-white">
                  {formatRupiah(dataBalance?.balance as number)}
                </p>
              )}
              <h1>{meAuth?.name}</h1>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Alert jika balance tidak cukup */}
        {!isBalanceEnough && (
          <Card className="border-2 border-red-600">
            <CardHeader>
              <CardTitle className="font-semibold flex items-center justify-between gap-3">
                Saldo E-Wallet anda tidak mencukupi untuk saat ini
                <Button className="rounded-full font-bold" asChild>
                  <Link href="/wallet/top-up">Top Up</Link>
                </Button>
              </CardTitle>
            </CardHeader>
          </Card>
        )}

        {/* Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={isChecked}
            onCheckedChange={() => setIsChecked(!isChecked)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Saya setuju dengan syarat dan ketentuan yang tersedia dan proses
            lanjut beli
          </label>
        </div>
      </div>

      {/* Tombol pay */}
      <div className="flex items-center justify-center">
        <Card className="rounded-full w-full md:w-1/2 lg:w-1/4">
          <CardHeader>
            <div className="flex flex-col justify-between">
              <CardTitle className="font-bold flex items-center justify-between gap-3">
                {detailPrice?.total && (
                  <p className="text-2xl font-bold">
                    {formatRupiah(detailPrice.total)}
                  </p>
                )}
                <Button
                  onClick={handleTransaction}
                  disabled={isPending || !isBalanceEnough}
                  className="font-bold cursor-pointer py-5 px-4 rounded-full"
                >
                  Pay Now
                </Button>
              </CardTitle>
              <CardDescription>Grand Total</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default TransactionTicket;
