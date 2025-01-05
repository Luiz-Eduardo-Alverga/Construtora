import { useQuery } from '@tanstack/react-query'
import { PlusCircle, Watch } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { getEmployeeFunctions } from '@/api/employeeFunctions/get-functions'
import { HeaderPages } from '@/components/header-pages'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { FilterFunctions } from './filter-functions'
import { FunctionsCard } from './functions-card'
import { RegisterNewFunctionDialog } from './register/register-new-functions-dialog'
import { CardSkeleton } from './skeleton/function-card-skeleton'

export function EmployeeJourney() {
  const searchParams = useSearchParams()[0]

  const nome = searchParams.get('nome')

  console.log(nome)

  const { data: employeeFunctions, isLoading: isLoadingFunctions } = useQuery({
    queryKey: ['getEmployeeFunctions', nome],
    queryFn: () => getEmployeeFunctions({ funcao: nome || '' }),
  })

  console.log(employeeFunctions)

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <HeaderPages
          title="Jornadas de Trabalho"
          description="Cadastre ou visualize as suas jornadas de trabalho"
          icon={Watch}
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full lg:w-44 h-9 space-x-2 ml-auto">
              <PlusCircle className="h-5 w-5" />
              <span>Nova Função</span>
            </Button>
          </DialogTrigger>

          <RegisterNewFunctionDialog />
        </Dialog>
      </div>

      <Separator />

      <div className="space-y-6">
        <FilterFunctions />

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoadingFunctions && <CardSkeleton />}
          {employeeFunctions &&
            employeeFunctions.data.map((employeeFunction) => (
              <FunctionsCard
                key={employeeFunction.id}
                id={employeeFunction.id}
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
