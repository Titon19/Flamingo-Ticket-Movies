import React from "react";
import CardParent from "./CardParent";
import { Clock, Film, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import LoadingHorizontal from "../CardHorizontal/loadingHorizontal";
import { Transaction } from "@/services/transactions/transaction.type";

const CardDetailHorizontal = ({
  orderDetail,
  isLoading,
}: {
  orderDetail: Transaction;
  isLoading?: boolean;
}) => {
  return (
    <CardParent>
      {isLoading ? (
        <LoadingHorizontal />
      ) : (
        <CardParent.Card>
          <CardParent.Content>
            <CardParent.Image
              src={orderDetail?.thumbnailUrl}
              alt={orderDetail?.movie.title}
            />
            <CardParent.Info>
              <CardParent.Title>{orderDetail?.movie.title}</CardParent.Title>
              <CardParent.Genre>
                <Film /> <p>{orderDetail?.movie.genre}</p>
              </CardParent.Genre>
              <CardParent.City>
                <Home /> <p>{orderDetail?.theater.city}</p>
              </CardParent.City>
              <CardParent.Time>
                <Clock />{" "}
                <p>{dayjs(orderDetail?.date).format("HH:mm, DD MMM YYYY")}</p>
              </CardParent.Time>
            </CardParent.Info>
          </CardParent.Content>
          <CardParent.Rating>
            <Badge variant={"outline"} className="bg-green-600">
              SUCCESS
            </Badge>
          </CardParent.Rating>
        </CardParent.Card>
      )}
    </CardParent>
  );
};

export default CardDetailHorizontal;
