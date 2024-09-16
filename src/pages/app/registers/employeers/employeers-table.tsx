import { MoreHorizontal } from 'lucide-react'
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

interface EmployeersProps {
  employeers: {
    nome: string | null
    cpf: string | null
    funcao: string | null
    cod: string | null
  }[]
}

export function EmployeersTable({ employeers }: EmployeersProps) {
  return (
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
        {employeers &&
          employeers.map((employee) => (
            <TableRow key={employee.cod}>
              <TableCell>{employee.cod}</TableCell>
              <TableCell>{employee.nome}</TableCell>
              <TableCell>{employee.cpf}</TableCell>
              <TableCell>{employee.funcao}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" aria-haspopup="true">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <NavLink to={`${employee.cod}/editar`}>
                      <DropdownMenuItem>Alterar</DropdownMenuItem>
                    </NavLink>
                    <DropdownMenuItem>Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
