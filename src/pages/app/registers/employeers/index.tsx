import { useQuery } from '@tanstack/react-query'
import { PlusCircle, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getEmployeersList } from '@/api/employee/get-employeers-list'
import { HeaderPages } from '@/components/header-pages'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { RegisterNewEmployeeDialog } from './dialogs/register-employee-dialog'
import { EmployeersFilters } from './employeers-filters'
import { EmployeersTable } from './employeers-table'

export function Employeers() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const name = searchParams.get('nome')
  const employeeCpf = searchParams.get('cpf')
  const employeeId = searchParams.get('codigoFuncionario')

  const limit = 10

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString())
      return prev
    })
  }

  const pageIndex = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page') ?? '1')

  const { data: employeers, isLoading: isLoadingEmployeers } = useQuery({
    queryKey: ['Employeers', pageIndex, name, employeeCpf, employeeId],
    queryFn: () =>
      getEmployeersList({
        nome: name,
        codigoFuncionario: employeeId,
        cpf: employeeCpf,
        limit,
        page: pageIndex,
      }),
  })

  useEffect(() => {
    if (employeers && !isLoadingEmployeers && employeers?.data.length === 0) {
      toast.info('Nenhum funcionário encontrado')
    }
  }, [isLoadingEmployeers, employeers])

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <HeaderPages
          title="Listagem de Funcionários"
          description="Cadastre ou pesquise por seus funcionários"
          icon={Users}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="w-full lg:w-44 h-9 space-x-2 ml-auto"
              onClick={() => setIsDialogOpen(true)}
            >
              <PlusCircle className="h-5 w-5" />
              <span>Novo Cadastro</span>
            </Button>
          </DialogTrigger>

          <RegisterNewEmployeeDialog onClose={() => setIsDialogOpen(false)} />
        </Dialog>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="flex gap-2 flex-col sm:flex-row justify-between ">
          <EmployeersFilters />
        </div>

        <EmployeersTable
          isLoadingEmployeers={isLoadingEmployeers}
          employeers={employeers?.data ?? []}
        />

        {employeers && employeers?.data && (
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={pageIndex}
            pages={employeers.totalPages ?? 0}
          />
        )}
      </div>
    </>
  )
}
