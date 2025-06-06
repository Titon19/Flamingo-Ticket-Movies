"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowUpIcon, Film } from "lucide-react";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

const CountCard = ({
  title,
  icon,
  items,
  isLoading,
}: {
  title: string;
  icon: React.ReactNode;
  items: any;
  isLoading: boolean;
}) => {
  return isLoading ? (
    <Skeleton className="h-45 w-80 rounded-xl" />
  ) : (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row itemss-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">{items?.data.length}</div>
        <Badge
          variant={"secondary"}
          className="flex items-center space-x-2 text-sm mb-3"
        >
          <div className="flex items-center">
            <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">+{20}</span>
          </div>
          <span className="text-muted-foreground">today</span>
        </Badge>
      </CardContent>
    </Card>
  );
};
export default CountCard;
