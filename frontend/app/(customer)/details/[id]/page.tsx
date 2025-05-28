"use client";
import MovieDetails from "@/components/Customer/IndexDetails/MovieDetails";
import ChooseSeats from "@/components/Customer/IndexDetails/ChooseSeats";
import ChooseTheater from "@/components/Customer/IndexDetails/ChooseTheater";
import ChooseTime from "@/components/Customer/IndexDetails/ChooseTime";
import { useAppSelector } from "@/redux/hooks";

const IndexDetails = () => {
  const { step } = useAppSelector((state) => state.ticket);

  return (
    <>
      {step === "DETAIL" && <MovieDetails />}
      {step === "THEATER" && <ChooseTheater />}
      {step === "TIME" && <ChooseTime />}
      {step === "SEAT" && <ChooseSeats />}
    </>
  );
};

export default IndexDetails;
