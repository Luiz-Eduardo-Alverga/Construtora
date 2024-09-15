import { useQuery } from '@tanstack/react-query'
import { MoreHorizontal, Users } from 'lucide-react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getEmployeersList } from '@/api/get-employeers-list'
import { HeaderPages } from '@/components/header-pages'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { EmployeersFilters } from './employeers-filters'
import { RegisterNewEmployeeDialog } from './register-employee-dialog'

export function Employeers() {
  const [searchParams] = useSearchParams()
  const name = searchParams.get('nome')
  const employeeCpf = searchParams.get('cpf')
  const employeeId = searchParams.get('codigoFuncionario')

  const limit = 10

  const pageIndex = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page') ?? '1')

  const {
    data: employeers,
    isLoading,
    isError,
  } = useQuery({
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

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (isError || !employeers?.listEmployeers) {
    return <div>Erro ao carregar os funcionários.</div>
  }

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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Função</TableHead>
            <TableHead className="sr-only">Toggle Menu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeers?.listEmployeers.length > 0 ? (
            employeers.listEmployeers.map((employee) => (
              <TableRow key={employee.codigo}>
                <TableCell>{employee.codigo}</TableCell>
                <TableCell>{employee.nome}</TableCell>
                <TableCell>{employee.cpf}</TableCell>
                <TableCell>{employee.funcao}</TableCell>
                <TableCell className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" aria-haspopup="true">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <NavLink to={`${employee.codigo}/editar`}>
                        <DropdownMenuItem>Alterar</DropdownMenuItem>
                      </NavLink>
                      <DropdownMenuItem>Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Nenhum funcionário encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
