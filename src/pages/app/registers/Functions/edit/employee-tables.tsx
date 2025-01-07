import { useQuery } from '@tanstack/react-query'
import { CircleHelp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getEmployeersList } from '@/api/employee/get-employeers-list'
import noData from '@/assets/noData.svg'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { EmployeersTableSkeleton } from './employee-table-skeleton'

interface EmployeeTableProps {
  functionId: string
}

export function EmployeersTable({ functionId }: EmployeeTableProps) {
  const navigate = useNavigate()

  const { data: employeers, isLoading: isLoadingEmployeers } = useQuery({
    queryKey: ['Employeers', functionId],
    queryFn: () =>
      getEmployeersList({
        funcao: functionId,
      }),
  })

  if (!employeers || employeers.data.length === 0) {
    return (
      <div className="mt-16  flex items-center justify-center  gap-10">
        <span>Nenhum funcionário vinculado a essa função</span>
        <img className="h-48 w-32" src={noData} alt="" />
      </div>
    )
  }

  return (
    <>
      {isLoadingEmployeers ? (
        <EmployeersTableSkeleton />
      ) : (
        <Table className="mt-4">
          <TableCaption className="caption-top pb-4">
            <div className="flex items-center justify-center gap-2">
              <span>Lista dos Funcionários vinculados a essa função</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="bg-primary rounded-full">
                    <CircleHelp className="h-6 w-6 text-white " />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>
                      Clique duas vezes na linha do funcionário <br /> para
                      abrir o cadastro
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employeers.data.map((employee) => (
              <TableRow
                className="hover:cursor-pointer"
                onDoubleClick={() =>
                  navigate(`/cadastros/funcionarios/${employee.cod}/editar`)
                }
                key={employee.cod}
              >
                <TableCell>{employee.cod}</TableCell>
                <TableCell>{employee.nome}</TableCell>
                <TableCell>{employee.cpf}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
