"use client";
import MovieDetails from "@/components/Customer/IndexDetails/MovieDetails";
import ChooseSeats from "@/components/Customer/IndexDetails/ChooseSeats";
import ChooseTheater from "@/components/Customer/IndexDetails/ChooseTheater";
import ChooseTime from "@/components/Customer/IndexDetails/ChooseTime";
import { useAppSelector } from "@/redux/hooks";
import { useFetchUserAuth } from "@/hooks/useFetchUserAuth";

const IndexDetails = () => {
  const { step } = useAppSelector((state) => state.ticket);
  const { data: meAuth } = useFetchUserAuth();

  return (
    <>
      {step === "DETAIL" && <MovieDetails />}
      {meAuth && step === "THEATER" && <ChooseTheater />}
      {meAuth && step === "TIME" && <ChooseTime />}
      {meAuth && step === "SEAT" && <ChooseSeats />}
    </>
  );
};

export default IndexDetails;
