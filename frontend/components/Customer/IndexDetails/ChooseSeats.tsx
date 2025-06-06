import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  setMovieDetail,
  setStep,
  setTicketDetail,
  Ticket,
} from "@/redux/features/ticket/ticketSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ArrowLeft, Table } from "lucide-react";

import { useParams, useRouter } from "next/navigation";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import CardHorizontal from "./CardHorizontal/CardHorizontal";
import type { MovieDetails } from "@/services/global/global.type";
import { formatRupiah } from "@/lib/utils";
import ChoosedTheaterCard from "./ChoosedTheaterCard";
import { useQuery } from "@tanstack/react-query";
import { checkSeats } from "@/services/global/global.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import useFetchMovieDetails from "@/hooks/customer/movies/useFetchMovieDetails";

const ChooseSeats = () => {
  const { id } = useParams();
  const { movie, isLoading } = useFetchMovieDetails(id as string);

  const [choosedSeats, setChoosedSeats] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { detail } = useAppSelector((state) => state.ticket);

  const { data: selectedSeats, isLoading: selectedSeatsLoading } = useQuery({
    queryKey: ["selected-seats", movie?._id, detail?.time],
    queryFn: async () => {
      return await checkSeats(movie?._id ?? "", detail?.time ?? "").then(
        (res) => res.data
      );
    },
  });

  const isBooked = useCallback(
    (seat: string) => {
      if (selectedSeatsLoading) return false;

      const seatBooked = selectedSeats?.find((value) => value.seat === seat);

      return !!seatBooked;
    },
    [selectedSeats, selectedSeatsLoading]
  );

  const handleChoosedSeats = (seat: string) => {
    if (isBooked(seat)) {
      return;
    }
    setChoosedSeats((prevSeats) => {
      if (prevSeats.includes(seat)) {
        // jika sudah ada, hapus
        return prevSeats.filter((item) => item !== seat);
      } else {
        // jika belum ada, tambahkan
        return [...prevSeats, seat];
      }
    });
  };

  const router = useRouter();

  const handleContinue = () => {
    if (choosedSeats.length === 0) {
      toast.error("Please choose a seat");
      return;
    }

    dispatch(setMovieDetail(movie as MovieDetails));

    dispatch(
      setTicketDetail({
        seat: choosedSeats.map((seat) => seat).join(","),
      })
    );

    router.push("/transaction-ticket");
  };

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={() => dispatch(setStep({ step: "TIME" }))}
          size="icon"
          className="rounded-full"
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-md md:text-lg lg:text-xl font-bold">
          Choose Seats
        </h1>
        <Table />
      </div>

      <div className="flex flex-col gap-3">
        <CardHorizontal movie={movie as MovieDetails} isLoading={isLoading} />
        <ChoosedTheaterCard detail={detail as Ticket} isLoading={isLoading} />

        <div className="flex flex-col justify-center gap-3">
          <h1 className="text-md md:text-lg lg:text-xl font-bold">
            Available Seats
          </h1>
          <h2 className="text-md md:text-lg lg:text-xl font-bold text-center py-8">
            Screeen
          </h2>

          <div className="w-full rounded-full dark:bg-white/50 bg-black/50 h-40" />
          <div className="grid grid-cols-5 gap-4 justify-center">
            {isLoading
              ? Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-8 md:h-12 lg:h-16 w-full rounded-full"
                    />
                  ))
              : movie?.seats?.map((item, index) => (
                  <button
                    type="button"
                    onClick={() => handleChoosedSeats(item.seat)}
                    key={index + 1}
                    disabled={isBooked(item.seat)}
                    className={`${
                      choosedSeats.includes(item.seat) ? "bg-pink-600" : ""
                    } ${
                      isBooked(item.seat)
                        ? "bg-neutral-950"
                        : "hover:border-pink-600"
                    } bg-neutral-800 p-4 font-bold min-w-fit border-2  transition-colors ease-in-out duration-300 cursor-pointer rounded-xl`}
                  >
                    <Input
                      type="checkbox"
                      name="seat"
                      value={item.seat}
                      defaultChecked={choosedSeats.includes(item.seat) || false}
                      onChange={() => handleChoosedSeats(item.seat)}
                      className="hidden"
                      disabled={isBooked(item.seat)}
                    />
                    <p className="text-center">{item.seat}</p>
                  </button>
                ))}
          </div>
        </div>
        <div className="flex gap-3 w-full mt-8 items-center justify-center">
          <Badge variant={"outline"} className="bg-neutral-800 text-white">
            Available
          </Badge>
          <Badge variant={"outline"} className="bg-neutral-900 text-white">
            Booked
          </Badge>
          <Badge variant={"outline"} className="bg-pink-600 text-white">
            Selected
          </Badge>
        </div>
        <div className="flex items-center justify-center mt-8">
          <Card className="p-4 w-fit font-bold rounded-full">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold">
                {formatRupiah((movie?.price ?? 0) * choosedSeats.length)}
                <span className="text-sm">/ {choosedSeats.length} Orang</span>
              </p>
              <Button
                disabled={isLoading}
                onClick={handleContinue}
                className="font-bold cursor-pointer py-5 px-4 rounded-full"
              >
                Continue
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ChooseSeats;
