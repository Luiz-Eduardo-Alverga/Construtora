import { MoreHorizontal, SquarePen, Trash2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
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

import { EmployeersTableSkeleton } from './employeers-table-skeleton'

interface EmployeersProps {
  employeers: {
    nome: string | null
    cpf: string | null
    funcao: string | null
    cod: string | null
  }[]
  isLoadingEmployeers: boolean
}

export function EmployeersTable({
  employeers,
  isLoadingEmployeers,
}: EmployeersProps) {
  return (
    <>
      {employeers.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden sm:table-cell">CPF</TableHead>
              <TableHead>Função</TableHead>
              <TableHead className="sr-only">Toggle Menu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingEmployeers && <EmployeersTableSkeleton />}

            {employeers &&
              employeers.map((employee) => (
                <TableRow key={employee.cod}>
                  <TableCell>{employee.cod}</TableCell>
                  <TableCell>{employee.nome}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {employee.cpf}
                  </TableCell>
                  <TableCell>{employee.funcao}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          aria-haspopup="true"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <NavLink to={`${employee.cod}/editar`}>
                          <DropdownMenuItem className="space-x-1">
                            <SquarePen className="h-5 w-5 text-green-400" />
                            <span>Alterar</span>
                          </DropdownMenuItem>
                        </NavLink>
                        <DropdownMenuItem className="space-x-1">
                          <Trash2 className="text-red-500 h-5 w-5" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <span></span>
      )}
    </>
  )
}
