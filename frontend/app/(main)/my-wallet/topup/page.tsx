"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useBalance from "@/hooks/customer/transaction-ticket/useBalance";
import { useFetchUserAuth } from "@/hooks/useFetchUserAuth";
import { formatRupiah } from "@/lib/utils";
import {
  walletTopop,
  WalletTopupValue,
} from "@/services/global/global.service";
import { Balance, WalletTopup } from "@/services/global/global.type";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  ArrowLeft,
  BadgeDollarSign,
  DollarSign,
  Timer,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const amountLists: number[] = [50000, 150000, 350000, 550000, 750000, 900000];

const TopupPage = () => {
  const { data: meAuth, isLoading } = useFetchUserAuth();
  const { dataBalance, isLoadingBalance } = useBalance();
  const [choosedAmount, setChoosedAmount] = useState<number>(0);
  const route = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: WalletTopupValue) => walletTopop(data),
  });

  const handleProcessed = async () => {
    try {
      if (choosedAmount === 0) {
        return toast.error("Please select amount to topup");
      }
      const { data } = await mutateAsync({ balance: choosedAmount });
      route.replace(data.redirect_url);
    } catch (error) {
      console.log(error, "Failed to topup");
    }
  };

  return (
    <>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-8">
          <Button asChild size="icon" className="rounded-full">
            <Link href={"/"}>
              <ArrowLeft />
            </Link>
          </Button>
          <h1 className="text-md md:text-lg lg:text-xl font-bold">
            Topup Wallet
          </h1>
          <Wallet />
        </div>

        <Card className="bg-green-950">
          <CardHeader className="flex flex-col">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-md md:text-lg lg:text-xl font-bold">
                Balance
              </h1>
              <Link href={"/my-wallet/topup"}>
                <Button className="rounded-full font-semibold">Topup</Button>
              </Link>
            </div>
            {isLoadingBalance ? (
              <Skeleton className="w-[100px] h-[30px] rounded-md bg-green-900" />
            ) : (
              <h1 className="text-md md:text-lg lg:text-xl font-bold">
                {formatRupiah(dataBalance?.balance ?? 0)}
              </h1>
            )}
          </CardHeader>

          <Separator />

          <CardDescription className="px-8">
            {isLoading ? (
              <Skeleton className="w-[150px] h-[30px] rounded-md bg-green-900" />
            ) : (
              <h3 className="font-semibold">{meAuth?.name}</h3>
            )}
          </CardDescription>
        </Card>
      </section>
      <section>
        <div className="flex flex-col gap-3">
          <h1 className="text-md md:text-lg lg:text-xl font-bold">
            Choose Amount
          </h1>
          <h1 className="font-bold text-center text-2xl p-8">
            {formatRupiah(choosedAmount)}
          </h1>
          <div className="flex flex-wrap gap-4 justify-center">
            {isLoading ? (
              <div
                className={`${
                  isLoading ? "animate-pulse" : ""
                } p-4 font-bold w-full  md:w-1/4 border-2 hover:border-pink-600 transition-colors ease-in-out duration-300 cursor-pointer rounded-xl`}
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex flex-col items-start gap-3">
                    <Skeleton className="h-4 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            ) : (
              amountLists.map((item, index) => (
                <label
                  key={item + index}
                  className={` ${
                    choosedAmount === item ? "bg-pink-600" : ""
                  } p-4 font-bold w-full  md:w-1/4 border-2 hover:border-pink-600 transition-colors ease-in-out duration-300 cursor-pointer rounded-xl`}
                >
                  <Input
                    type="radio"
                    name="theater"
                    value={item}
                    className="hidden"
                    onChange={() => setChoosedAmount(item)}
                  />
                  <div className="flex items-center gap-3">
                    <BadgeDollarSign className="w-8 h-8" />
                    <div className="flex flex-col items-start gap-3">
                      <p className="text-center">{formatRupiah(item)}</p>
                    </div>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>
        <div className="flex items-center justify-center mt-8">
          <Card className="p-4 md:w-1/2 w-full font-bold rounded-full">
            <Button
              onClick={handleProcessed}
              isPending={isPending}
              disabled={isPending}
              className="font-bold cursor-pointer py-5 px-4 rounded-full"
            >
              Processed to Topup
            </Button>
          </Card>
        </div>
      </section>
    </>
  );
};

export default TopupPage;
