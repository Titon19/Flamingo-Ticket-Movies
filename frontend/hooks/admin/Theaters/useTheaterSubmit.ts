"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  createTheater,
  detailTheater,
  editTheater,
  theaterSchema,
  type TheaterValue,
} from "@/services/theaters/theater.service";
import { getCities } from "@/services/theaters/theater.service";
import { City, Theater } from "@/services/theaters/theater.type";
import { toast } from "sonner";

const useFetchTheaterDetail = (itemId: string) => {
  const { data: detail, isLoading } = useQuery({
    queryKey: ["detail-theater", itemId],
    queryFn: async () => await detailTheater(itemId).then((res) => res.data),
    enabled: !!itemId,
  });

  return { detail, isLoading };
};
const useGetCitiesSelector = () => {
  const { data: cities, isLoading: citySelectorLoading } = useQuery<City[]>({
    queryKey: ["cities-selector"],
    queryFn: async () => await getCities(),
  });

  return { cities, citySelectorLoading };
};

const useTheaterSubmit = ({ itemId }: { itemId?: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { detail, isLoading } = useFetchTheaterDetail(itemId ?? "");
  const { cities, citySelectorLoading } = useGetCitiesSelector();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: TheaterValue) => {
      return itemId ? editTheater(data, itemId) : createTheater(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["theaters"] });
    },
  });

  const form = useForm<TheaterValue>({
    resolver: zodResolver(theaterSchema),
    defaultValues: {
      name: "",
      city: "",
    },
  });

  useEffect(() => {
    if (itemId && detail) {
      form.reset({
        name: detail.name,
        city: detail.city,
      });
    }
  }, [form, itemId, detail]);

  const onSubmit = async (data: TheaterValue) => {
    try {
      const response = await mutateAsync(data);
      if (response.status === "Success") {
        toast.success(response.message || "Password changed successfully");
      } else {
        toast.error(response.message || "Password change failed");
      }
      router.push("/admin/theaters");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return {
    onSubmit,
    isPending,
    isLoading,
    form,

    cities,
    citySelectorLoading,
  };
};

export default useTheaterSubmit;
