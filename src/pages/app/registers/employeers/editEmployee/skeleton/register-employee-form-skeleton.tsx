import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { FormContainer } from '../Form/form-container'

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
            <FormContainer>
              <Skeleton className="h-8 w-[850px]" />

              <Skeleton className="h-8 flex-1" />
            </FormContainer>

            <FormContainer>
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
              <Skeleton className="h-8 flex-1" />
            </FormContainer>

            <div>
              <Skeleton className="h-10 w-full" />
            </div>

            <FormContainer>
              <Skeleton className="h-8 col-span-1" />
              <Skeleton className="h-8 col-span-2" />
              <Skeleton className="h-8 col-span-1" />
            </FormContainer>

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
