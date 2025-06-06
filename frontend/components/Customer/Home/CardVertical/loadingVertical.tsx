import { Skeleton } from "@/components/ui/skeleton";

const LoadingVertical = () => {
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

export default LoadingVertical;
