"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useBalance from "@/hooks/customer/transaction-ticket/useBalance";
import { useFetchUserAuth } from "@/hooks/useFetchUserAuth";
import { formatRupiah } from "@/lib/utils";
import { getBalance, getTopopHistory } from "@/services/global/global.service";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Wallet, Wallet2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  const { data: meAuth, isLoading } = useFetchUserAuth();
  const { dataBalance, isLoadingBalance } = useBalance();
  const { data: historyTransactions, isLoading: isLoadingTopopHistory } =
    useQuery({
      queryKey: ["topup-history"],
      queryFn: () => getTopopHistory().then((res) => res.data),
    });
  return (
    <>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-8">
          <Button asChild size="icon" className="rounded-full">
            <Link href={"/"}>
              <ArrowLeft />
            </Link>
          </Button>
          <h1 className="text-md md:text-lg lg:text-xl font-bold">My Wallet</h1>
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
        <h1 className="text-md md:text-lg lg:text-xl font-bold mb-4">
          Latest Transactions
        </h1>

        <div className="flex flex-col gap-3">
          {historyTransactions?.map((history) => (
            <Card key={history._id}>
              <CardHeader className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="md:p-8 p-4 border-2 border-neutral-700 rounded-xl">
                    <Wallet />
                  </div>
                  <div className="flex flex-col font-bold">
                    <h1>Topup Wallet</h1>
                    <p className="text-green-500">
                      +{formatRupiah(history.price)}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${
                    history.status === "success"
                      ? "bg-green-600"
                      : history.status === "failed"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  } capitalize`}
                >
                  {history.status}
                </Badge>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
