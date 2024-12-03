import { Skeleton } from '@/components/ui/skeleton'

export function CardSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col p-4 border rounded-md hover:bg-secondary hover:cursor-pointer"
        >
          <div className="w-full flex justify-between">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-14 h-4" />
          </div>

          <div className="space-y-2 mt-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>

          <div className="flex mt-2 space-x-1 ml-auto">
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-10 h-4" />
          </div>
        </div>
      ))}
    </>
  )
}
