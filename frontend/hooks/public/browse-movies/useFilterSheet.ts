import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { filterSchema, FilterValues } from "@/services/global/global.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { setFilter } from "@/redux/features/filter/filterSlice";
import useFetchCitiesPublic from "../cities/useFetchCitiesPublic";
import useFetchTheatersPublic from "../theaters/useFetchTheatersPublic";
import useFetchGenresPublic from "../genres/useFetchGenresPublic";

const useFilterSheet = () => {
  const { genres } = useFetchGenresPublic();
  const { theaters } = useFetchTheatersPublic();
  const { cities } = useFetchCitiesPublic();

  const filter = useAppSelector((state) => state.filter.data);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const params = useParams();

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      city: filter?.city,
      genre: filter?.genre,
      theaters: filter?.theaters,
      availability: "1",
    },
  });

  const removeCityFilter = () => {
    form.setValue("city", "");
    dispatch(setFilter({ data: { ...filter, city: undefined } }));
  };

  const onSubmit = async (data: FilterValues) => {
    await router.push(`/browse-movies/${data.genre}`);
    params.id = data.genre;

    await dispatch(
      setFilter({
        data: {
          availability: data.availability === "1" ? true : false,
          city: data.city,
          genre: data.genre,
          theaters: data.theaters,
        },
      })
    );
  };
  return { removeCityFilter, onSubmit, form, genres, theaters, cities, filter };
};

export default useFilterSheet;
