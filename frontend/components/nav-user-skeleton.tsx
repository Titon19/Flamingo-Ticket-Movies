import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonUser() {
  return (
    <div className="flex items-center space-x-4 ">
      <Skeleton className="h-12 w-12 rounded-full bg-neutral-400" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px] bg-neutral-400" />
        <Skeleton className="h-4 w-[150px] bg-neutral-400" />
      </div>
    </div>
  );
}
