import React from "react";
import CardParent from "./CardParent";
import { Skeleton } from "@/components/ui/skeleton";

const loadingHorizontal = () => {
  return (
    <CardParent.Card>
      <CardParent.Content>
        <Skeleton className="w-[100px] h-[130px] rounded-md" />
        <CardParent.Info>
          <CardParent.Title>
            <Skeleton className="w-[100px] h-[20px] rounded-md" />
          </CardParent.Title>
          <CardParent.Genre>
            <Skeleton className="w-[30px] h-[10px] rounded-md" />
          </CardParent.Genre>
        </CardParent.Info>
      </CardParent.Content>
      <CardParent.Rating>
        <Skeleton className="w-[20px] h-[20px] rounded-md" />
      </CardParent.Rating>
    </CardParent.Card>
  );
};

export default loadingHorizontal;
