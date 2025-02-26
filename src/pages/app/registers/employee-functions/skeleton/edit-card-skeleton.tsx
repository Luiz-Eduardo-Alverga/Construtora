import { Skeleton } from '@/components/ui/skeleton'

export function EditFunctionFormSkeleton() {
  return (
    <div>
      <div className="mx-4 flex justify-between flex-col sm:flex-row">
        <Skeleton className="w-36 h-4" />
        <Skeleton className="sr-only sm:not-sr-only sm:w-[500px] sm:h-8" />

        <div className="flex flex-col gap-2 not-sr-only sm:sr-only mt-4">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </div>
      </div>

      <div className="mx-4 mt-8 sm:max-w-[450px] sm:mx-auto space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-full" />
        </div>

        <div className="flex flex-col gap-4 items-end">
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>

        <div className="space-y-0.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  )
}
