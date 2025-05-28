import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  createTheater,
  editTheater,
  type theaterData,
  theaterSchema,
} from "../../../services/theaters/theater.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { City, Theater } from "../../../services/theaters/theater.type";

const useTheaterSubmit = () => {
  const { detail, cities } = useLoaderData() as {
    detail: Theater;
    cities: City[] | null;
  };

  const form = useForm<theaterData>({
    resolver: zodResolver(theaterSchema),
    defaultValues: { name: detail?.name, city: detail?.city },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: theaterData) =>
      detail === null ? createTheater(data) : editTheater(data, detail._id),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: theaterData) => {
    try {
      await mutateAsync(data);
      navigate("/admin/theaters");
      toast.success(
        `Theater berhasil ${detail === null ? "ditambahkan" : "diedit"}`
      );
    } catch (error) {
      console.log(error);
      toast.error(
        `Theater gagal ${detail === null ? "ditambahkan" : "diedit"}`
      );
    }
  };
  return { onSubmit, isPending, form, detail, cities };
};

export default useTheaterSubmit;
