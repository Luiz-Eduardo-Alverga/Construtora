import { useQuery } from '@tanstack/react-query'
import { Watch } from 'lucide-react'

import { getEmployeeFunctions } from '@/api/get-functions'
import { HeaderPages } from '@/components/header-pages'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { FilterFunctions } from './filter-functions'
import { FunctionsCard } from './functions-card'
import { RegisterNewFunctionDialog } from './register/register-new-functions-dialog'
import { CardSkeleton } from './skeleton/function-card-skeleton'

export function EmployeeJourney() {
  const { data: employeeFunctions, isLoading: isLoadingFunctions } = useQuery({
    queryKey: ['getEmployeeFunctions'],
    queryFn: getEmployeeFunctions,
  })

  return (
    <>
      <div className="flex items-center">
        <HeaderPages
          title="Jornadas de Trabalho"
          description="Cadastre ou visualize as suas jornadas de trabalho"
          icon={Watch}
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto">Nova Função</Button>
          </DialogTrigger>

          <RegisterNewFunctionDialog />
        </Dialog>
      </div>

      <Separator />

      <div className="space-y-6">
        <FilterFunctions />

        <div className="mt-24 grid grid-cols-3 gap-4">
          {isLoadingFunctions && <CardSkeleton />}
          {employeeFunctions &&
            employeeFunctions.data.map((employeeFunction) => (
              <FunctionsCard
                key={employeeFunction.id}
                title={employeeFunction.nome}
                description={
                  employeeFunction.descricao || 'Aqui fica a descricao'
                }
                diasJornada={employeeFunction.diasJornada}
              />
            ))}
        </div>
      </div>
    </>
  )
}
