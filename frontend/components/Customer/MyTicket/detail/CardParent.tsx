import React from "react";

import { Badge } from "../../../ui/badge";
import Link from "next/link";

const CardParent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-3 mb-4">
      <h1 className="text-md md:text-lg lg:text-xl font-bold">Orders</h1>
      {children}
    </div>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3 justify-between items-center border-2  rounded-xl p-1 border-pink-600 transition-colors ease-in-out duration-300">
      {children}
    </div>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-3">{children}</div>;
};

const Image = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-[100px] h-[130px] rounded-md object-cover bg-neutral-800"
    />
  );
};

const Info = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-start">
      {children}
    </div>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-md font-bold">{children}</h1>;
};

const Genre = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2">
      <Badge variant={"secondary"}>{children}</Badge>
    </div>
  );
};
const City = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2">
      <Badge variant={"secondary"}>{children}</Badge>
    </div>
  );
};
const Time = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2">
      <Badge variant={"secondary"}>{children}</Badge>
    </div>
  );
};

const Location = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2">
      <Badge variant={"secondary"}>{children}</Badge>
    </div>
  );
};

const Rating = ({ children }: { children: React.ReactNode }) => (
  <div className="p-3">{children}</div>
);

CardParent.Card = Card;
CardParent.Content = Content;
CardParent.Image = Image;
CardParent.Info = Info;
CardParent.Title = Title;
CardParent.Genre = Genre;
CardParent.City = City;
CardParent.Time = Time;
CardParent.Location = Location;
CardParent.Rating = Rating;

export default CardParent;
