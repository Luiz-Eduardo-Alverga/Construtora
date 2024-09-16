import { useQuery } from '@tanstack/react-query'
import { Users } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getEmployeersList } from '@/api/get-employeers-list'
import { HeaderPages } from '@/components/header-pages'
import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { EmployeersFilters } from './employeers-filters'
import { EmployeersTable } from './employeers-table'
import { RegisterNewEmployeeDialog } from './register-employee-dialog'

export function Employeers() {
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

  const { data: employeers } = useQuery({
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

  console.log(employeers)

  return (
    <div className="m-2 pt-4 space-y-6">
      <HeaderPages
        title="Listagem de Funcionários"
        description="Cadastre ou pesquise por seus funcionários"
        icon={Users}
      />

      <div className="flex items-center justify-between h-20">
        <EmployeersFilters />
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="p-5">
              Novo Cadastro
            </Button>
          </DialogTrigger>

          <RegisterNewEmployeeDialog />
        </Dialog>
      </div>

      <EmployeersTable employeers={employeers?.data ?? []} />

      {employeers?.totalPages && (
        <Pagination
          onPageChange={handlePaginate}
          pageIndex={pageIndex}
          pages={employeers.totalPages ?? 0}
        />
      )}
    </div>
  )
}
