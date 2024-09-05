import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { FileClock } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { getEmployeePoints } from '@/api/getUserPoints'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { EmployeePontFilters } from './employee-point-filters'

export function EmployeePoints() {
  const [searchParams] = useSearchParams()

  const employeeId = searchParams.get('employeeId')
  const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined
  const dataInicio = searchParams.get('dataInicio')
  const dataFim = searchParams.get('dataFim')

  const { data: results } = useQuery({
    queryKey: ['employee', parsedEmployeeId, dataInicio, dataFim],
    queryFn: () => {
      return getEmployeePoints({
        Employeeid: parsedEmployeeId,
        DataInicio: dataInicio,
        DataFim: dataFim,
      })
    },
  })

  return (
    <div className="pl-4 pt-4 space-y-10">
      <div className="flex flex-row items-center gap-2">
        <h1 className="text-2xl font-medium">Listagem de Pontos</h1>
        <FileClock className="h-8 w-8 text-primary" />
      </div>

      <EmployeePontFilters />

      <Table>
        <TableCaption>Uma lista dos pontos do seu funcionário</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Data</TableHead>
            <TableHead>Hora Início</TableHead>
            <TableHead>Hora Almoço</TableHead>
            <TableHead>Hora Retorno</TableHead>
            <TableHead>Hora Fim</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(results) && results.length > 0 ? (
            results.map((result) => (
              <TableRow key={result.Data}>
                <TableCell className="w-[200px]">
                  {format(new Date(result.Data), 'yyyy-MM-dd')}
                </TableCell>
                <TableCell>{result.HoraInicio}</TableCell>
                <TableCell>{result.HoraAlmoco}</TableCell>
                <TableCell>{result.HoraRetorno}</TableCell>
                <TableCell>{result.HoraFim}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Nenhum ponto encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
