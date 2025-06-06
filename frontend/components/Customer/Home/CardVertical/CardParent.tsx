import { Skeleton } from "@/components/ui/skeleton";
import { Film } from "lucide-react";
import Link from "next/link";
import React from "react";

const CardParent = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col gap-3 mb-4">
      <h1 className="text-md md:text-lg lg:text-xl font-bold">Coming Soon</h1>
      <div className="flex gap-3 overflow-x-auto">{children}</div>
    </section>
  );
};

const Card = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="relative md:min-w-[300px] md:h-[400px] min-w-[250px] min-h-[350px] my-5 flex flex-col gap-3 justify-between items-center "
    >
      {children}
    </Link>
  );
};

const Image = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="md:w-[300px] md:h-[400px] w-[250px] h-[350px] object-cover border-2 border-neutral-800 rounded-xl hover:border-pink-600 transition-colors ease-in-out duration-300"
    />
  );
};

const Info = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute z-40 bottom-0 md:min-w-[270px] min-w-[230px] m-2 flex items-center gap-3 bg-black/30 backdrop-blur-sm rounded-xl p-2 px-3">
      <Film />
      <div className="flex flex-col text-sm md:text-md lg:text-lg font-bold">
        {children}
      </div>
    </div>
  );
};

const Genre = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-xs md:text-sm lg:text-md">{children}</p>;
};
const Title = ({ children }: { children: React.ReactNode }) => {
  return <h1>{children}</h1>;
};

const SkeletonCard = () => {
  return (
    <div className="relative md:min-w-[300px] md:h-[400px] min-w-[250px] min-h-[350px] my-5 flex flex-col gap-3 justify-between items-center">
      <Skeleton className="md:w-[300px] md:h-[400px] w-[250px] h-[350px] rounded-xl" />

      <div className="absolute z-50 bottom-0 md:min-w-[270px] min-w-[230px] m-2 flex items-center gap-3 bg-black/30 backdrop-blur-sm rounded-xl p-2 px-3">
        <Skeleton className="w-6 h-6 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
};

CardParent.Card = Card;
CardParent.Image = Image;
CardParent.Info = Info;
CardParent.Genre = Genre;
CardParent.Title = Title;
CardParent.Skeleton = SkeletonCard;

export default CardParent;
