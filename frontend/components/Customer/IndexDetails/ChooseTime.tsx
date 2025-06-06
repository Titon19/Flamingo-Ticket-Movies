import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  setStep,
  setTicketDetail,
  Ticket,
} from "@/redux/features/ticket/ticketSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ArrowLeft, Clock, Timer } from "lucide-react";

import { useParams } from "next/navigation";
import useFetchMovieDetails from "@/hooks/customer/movies/useFetchMovieDetails";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import CardHorizontal from "./CardHorizontal/CardHorizontal";
import type { MovieDetails } from "@/services/global/global.type";
import ChoosedTheaterCard from "./ChoosedTheaterCard";
import { Skeleton } from "@/components/ui/skeleton";

const ChooseTime = () => {
  const { id } = useParams();
  const { movie, isLoading } = useFetchMovieDetails(id as string);

  const [choosedTime, setChoosedTime] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { detail } = useAppSelector((state) => state.ticket);

  const handleContinue = () => {
    if (choosedTime === null) {
      toast.error("Please choose a Time");
      return;
    }

    dispatch(
      setTicketDetail({
        time: choosedTime,
      })
    );

    dispatch(
      setStep({
        step: "SEAT",
      })
    );
  };

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={() => dispatch(setStep({ step: "THEATER" }))}
          size="icon"
          className="rounded-full"
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-md md:text-lg lg:text-xl font-bold">Choose Time</h1>
        <Clock />
      </div>

      {
        <div className="flex flex-col gap-3">
          <CardHorizontal movie={movie as MovieDetails} isLoading={isLoading} />
          <ChoosedTheaterCard detail={detail as Ticket} isLoading={isLoading} />

          <div className="flex flex-col gap-3">
            <h1 className="text-md md:text-lg lg:text-xl font-bold">
              Choose Time
            </h1>
            <div className="flex flex-wrap gap-4">
              {isLoading ? (
                <div
                  className={`${
                    isLoading ? "animate-pulse" : ""
                  } p-4 font-bold w-full  md:w-1/4 border-2 hover:border-pink-600 transition-colors ease-in-out duration-300 rounded-xl`}
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex flex-col items-start gap-3">
                      <Skeleton className="h-4 w-16 rounded-full" />
                      <Skeleton className="h-4 w-24 rounded-full" />
                      <Skeleton className="h-4 w-32 rounded-full" />
                    </div>
                  </div>
                </div>
              ) : (
                movie?.times?.map((item, index) => (
                  <label
                    key={item + index}
                    className={`${
                      choosedTime ===
                        `${dayjs().format("DD-MMM-YYYY")} ${item}` &&
                      "bg-pink-600"
                    } p-4 font-bold w-full  md:w-1/4 border-2 hover:border-pink-600 transition-colors ease-in-out duration-300 cursor-pointer rounded-xl`}
                  >
                    <Input
                      type="radio"
                      name="theater"
                      value={item}
                      className="hidden"
                      onChange={() =>
                        setChoosedTime(
                          `${dayjs().format("DD-MMM-YYYY")} ${item}`
                        )
                      }
                    />
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8" />
                      <div className="flex flex-col items-start gap-3">
                        <h3>Available</h3>
                        <p className="text-center">{item}</p>
                        <Badge className="text-center flex items-center gap-2 lowercase">
                          <Timer className="w-4 h-4" />
                          {dayjs().format("DD MMM YYYY")}
                        </Badge>
                      </div>
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>
      }

      <div className="flex items-center justify-center mt-8">
        <Card className="p-4 md:w-1/2 w-full font-bold rounded-full">
          <Button
            onClick={handleContinue}
            className="font-bold cursor-pointer py-5 px-4 rounded-full"
          >
            Continue
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default ChooseTime;
