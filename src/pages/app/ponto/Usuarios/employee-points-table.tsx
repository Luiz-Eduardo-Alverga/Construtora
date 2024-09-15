import { format, parse } from 'date-fns'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { EmployeePointDetailsDialog } from './employee-point-details-dialog'

interface EmployeePointsTableProps {
  results: {
    Data: string
    HoraInicio: string | null
    HoraAlmoco: string | null
    HoraRetorno: string | null
    HoraFim: string | null
  }[]
}

export function EmployeePointsTable({ results }: EmployeePointsTableProps) {
  return (
    <div className="overflow-hidden overflow-x-auto">
      <Table className="border-collapse w-full">
        <TableCaption className="sr-only">
          Uma lista dos pontos do seu funcionário
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Data</TableHead>
            <TableHead className="hidden sm:table-cell">Hora Início</TableHead>
            <TableHead className="hidden sm:table-cell">Hora Almoço</TableHead>
            <TableHead className="hidden sm:table-cell">Hora Retorno</TableHead>
            <TableHead className="hidden sm:table-cell">Hora Fim</TableHead>
            <TableHead className="sm:hidden text-right">Horários</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length > 0 ? (
            results.map((result) => (
              <TableRow key={result.Data}>
                <TableCell>
                  {format(
                    parse(result.Data, 'dd/MM/yyyy', new Date()),
                    'yyyy-MM-dd',
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {result.HoraInicio ?? 'N/A'}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {result.HoraAlmoco ?? 'N/A'}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {result.HoraRetorno ?? 'N/A'}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {result.HoraFim ?? 'N/A'}
                </TableCell>
                <TableCell className="text-right sm:hidden">
                  <EmployeePointDetailsDialog
                    HoraInicio={result.HoraInicio ?? 'N/A'}
                    HoraAlmoco={result.HoraAlmoco ?? 'N/A'}
                    HoraRetorno={result.HoraRetorno ?? 'N/A'}
                    HoraFim={result.HoraFim ?? 'N/A'}
                  />
                </TableCell>
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
