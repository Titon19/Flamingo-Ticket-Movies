"use client";
import { Clock, Film, Home } from "lucide-react";
import CardParent from "./CardParent";
import LoadingHorizontal from "./loadingHorizontal";
import type { Transaction } from "@/services/transactions/transaction.type";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
const CardHorizontal = ({
  orders,
  isLoading,
}: {
  orders: Transaction[];
  isLoading: boolean;
}) => {
  return (
    <CardParent>
      {isLoading ? (
        <LoadingHorizontal />
      ) : (
        orders?.map((item, index) => (
          <CardParent.Card key={index + 1} href={`/my-ticket/${item._id}`}>
            <CardParent.Content>
              <CardParent.Image
                src={item.thumbnailUrl}
                alt={item.movie.title}
              />
              <CardParent.Info>
                <CardParent.Title>{item.movie.title}</CardParent.Title>
                <CardParent.Genre>
                  <Film /> <p>{item.movie.genre}</p>
                </CardParent.Genre>
                <CardParent.City>
                  <Home /> <p>{item.theater.city}</p>
                </CardParent.City>
                <CardParent.Time>
                  <Clock />{" "}
                  <p>{dayjs(item.date).format("HH:mm, DD MMM YYYY")}</p>
                </CardParent.Time>
              </CardParent.Info>
            </CardParent.Content>
            <CardParent.Rating>
              <Badge variant={"outline"} className="bg-green-600">
                SUCCESS
              </Badge>
            </CardParent.Rating>
          </CardParent.Card>
        ))
      )}
    </CardParent>
  );
};

export default CardHorizontal;
