"use client";
import { Film } from "lucide-react";

import LoadingHorizontal from "./loadingHorizontal";

import type { MovieDetails } from "@/services/global/global.type";
import CardParent from "./CardParent";
const CardHorizontal = ({
  movie,
  isLoading,
}: {
  movie: MovieDetails;
  isLoading?: boolean;
}) => {
  return (
    <CardParent>
      {isLoading ? (
        <LoadingHorizontal />
      ) : (
        <CardParent.Card key={movie?._id}>
          <CardParent.Content>
            <CardParent.Image
              src={movie?.thumbnailUrl ?? ""}
              alt={movie?.title ?? ""}
            />
            <CardParent.Info>
              <CardParent.Title>{movie?.title}</CardParent.Title>
              <CardParent.Genre>
                <Film /> <p>{movie?.genre.name}</p>
              </CardParent.Genre>
            </CardParent.Info>
          </CardParent.Content>
          <CardParent.Rating>4/5⭐</CardParent.Rating>
        </CardParent.Card>
      )}
    </CardParent>
  );
};

export default CardHorizontal;
