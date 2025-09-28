import { Skeleton } from "@/components/ui/skeleton";

export function NewsCardSkeleton() {
  return (
    <div className="p-6 space-y-4 border rounded-lg">
      <div className="flex justify-between items-start gap-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-16" />
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-16" />
      </div>
      
      <Skeleton className="h-3 w-32" />
    </div>
  );
}