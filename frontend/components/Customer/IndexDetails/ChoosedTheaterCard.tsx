import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Ticket } from "@/redux/features/ticket/ticketSlice";
import { Home, TheaterIcon } from "lucide-react";
import React from "react";

const ChoosedTheaterCard = ({
  detail,
  isLoading,
}: {
  detail: Ticket;
  isLoading?: boolean;
}) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-md md:text-lg lg:text-xl font-bold">
          Choosed Theater
        </h1>
        <div className="flex flex-wrap gap-4">
          {isLoading ? (
            <div className="p-4 w-full md:w-fit border-2 border-neutral-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex flex-col items-start gap-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 font-bold w-full md:w-fit border-2 border-pink-600 transition-colors ease-in-out duration-300 cursor-pointer rounded-xl">
              <div className="flex items-center gap-3">
                <TheaterIcon className="w-8 h-8" />
                <div className="flex flex-col items-start gap-3">
                  <p className="text-center">{detail?.theater?.name}</p>
                  <Badge className="text-center flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    {detail?.theater?.city}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChoosedTheaterCard;
