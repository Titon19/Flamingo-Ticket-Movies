import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { setStep, setTicketDetail } from "@/redux/features/ticket/ticketSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ArrowLeft, Home, TheaterIcon } from "lucide-react";

import { useParams } from "next/navigation";
import useFetchMovieDetails from "@/hooks/customer/movies/useFetchMovieDetails";
import type { MovieDetails } from "@/services/global/global.type";
import { Badge } from "@/components/ui/badge";
import { Theater } from "@/services/theaters/theater.type";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import CardHorizontal from "./CardHorizontal/CardHorizontal";
import { Skeleton } from "@/components/ui/skeleton";

const ChooseTheater = () => {
  const { id } = useParams();
  const { movie, isLoading } = useFetchMovieDetails(id as string);
  const [choosedTheater, setChoosedTheater] = useState<Theater | null>(null);
  console.log(choosedTheater);
  const dispatch = useAppDispatch();

  const handleContinue = () => {
    if (choosedTheater === null) {
      toast.error("Please choose a theater");
      return;
    }

    dispatch(
      setTicketDetail({
        theater: choosedTheater,
      })
    );

    dispatch(
      setStep({
        step: "TIME",
      })
    );
  };

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={() => dispatch(setStep({ step: "DETAIL" }))}
          size="icon"
          className="rounded-full"
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-md md:text-lg lg:text-xl font-bold">
          Choose Theater
        </h1>
        <TheaterIcon />
      </div>

      {
        <div className="flex flex-col gap-3">
          <CardHorizontal isLoading={isLoading} movie={movie as MovieDetails} />

          <div className="flex flex-col gap-3">
            <h1 className="text-md md:text-lg lg:text-xl font-bold">
              Available in Theaters
            </h1>
            <div className="flex flex-wrap gap-4">
              {isLoading ? (
                <div className="p-4 w-full md:w-fit border-2 border-gray-300 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div className="flex flex-col items-start gap-3">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              ) : (
                movie?.theaters?.map((item) => (
                  <label
                    key={item._id}
                    className={`${
                      item._id === choosedTheater?._id && "bg-pink-600"
                    } p-4 font-bold w-full md:w-fit border-2 hover:border-pink-600 transition-colors ease-in-out duration-300 cursor-pointer rounded-xl`}
                  >
                    <Input
                      type="radio"
                      name="theater"
                      value={item._id}
                      className="hidden"
                      onChange={() => setChoosedTheater(item)}
                    />
                    <div className="flex items-center gap-3">
                      <TheaterIcon className="w-8 h-8" />
                      <div className="flex flex-col items-start gap-3">
                        <p className="text-center">{item.name}</p>
                        <Badge className="text-center flex items-center gap-2">
                          <Home className="w-4 h-4" />
                          {item.city}
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
            disabled={isLoading}
            className="font-bold cursor-pointer py-5 px-4 rounded-full"
          >
            Continue
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default ChooseTheater;
