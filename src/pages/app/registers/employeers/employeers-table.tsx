import { AlertDialog } from '@radix-ui/react-alert-dialog'
import { MoreHorizontal, SquarePen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { AlertDialogTrigger } from '@/components/ui/alert-dialog'
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

import { DeleteEmployeeDialog } from './dialogs/delete-employee-dialog'
import { EmployeersTableSkeleton } from './skeleton/employeers-table-skeleton'

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
  const [removingEmployeeId, setRemovingEmployeeId] = useState<string | null>(
    null,
  )

  const navigate = useNavigate()

  return (
    <>
      {isLoadingEmployeers && <EmployeersTableSkeleton />}
      {employeers.length > 0 && (
        <div className="">
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
              {employeers &&
                employeers.map((employee) => (
                  <TableRow
                  onDoubleClick={() => navigate(`${employee.cod}/editar`)}
                    key={employee.cod}
                    className={`employee-row ${
                      removingEmployeeId === employee.cod
                        ? 'animate-fadeOut'
                        : ''
                    }`}
                  >
                    <TableCell>{employee.cod}</TableCell>
                    <TableCell>{employee.nome}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {employee.cpf}
                    </TableCell>
                    <TableCell>{employee.funcao}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
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

                            <DropdownMenuItem asChild className="space-x-1">
                              <AlertDialogTrigger className="w-full">
                                <Trash2 className="h-5 w-5 text-red-500" />
                                <span>Excluir</span>
                              </AlertDialogTrigger>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <DeleteEmployeeDialog
                          id={employee.cod}
                          name={employee.nome}
                          onDelete={(id) => setRemovingEmployeeId(id)} // Definindo o ID do funcionário
                        />
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}
