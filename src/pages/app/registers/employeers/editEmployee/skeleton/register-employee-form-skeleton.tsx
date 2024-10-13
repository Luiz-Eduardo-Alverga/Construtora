import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export function RegisterEmployeeFormSkeleton() {
  return (
    <div>
      <div>
        <div className="m-4 text-base space-y-2">
          <Skeleton className="h-6 w-32" />
          <Separator className="" />
        </div>

        <div className="mx-4 mt-12">
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <Skeleton className="h-8 w-[850px]" />

              <Skeleton className="h-8 flex-1" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
            </div>

            <div>
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="grid grid-cols-4 gap-2 items-center">
              <Skeleton className="h-8 col-span-1" />
              <Skeleton className="h-8 col-span-2" />
              <Skeleton className="h-8 col-span-1" />
            </div>

            <div className="grid grid-cols-5 gap-2 items-center">
              <Skeleton className="h-8 col-span-1" />
              <Skeleton className="h-8 col-span-1" />
              <Skeleton className="h-8 col-span-1" />
              <Skeleton className="h-8 col-span-2" />
            </div>
            <Separator />

            <div className="flex gap-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
