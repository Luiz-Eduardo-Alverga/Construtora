import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function EmployeersTableSkeleton() {
  return (
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
        {Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="w-4 h-4 sm:w-[126px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[40px] h-4 sm:w-[536px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="hidden sm:table-cell sm:h-4 sm:w-[134px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-16 h-4 sm:w-[160px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-8 h-4 sm:w-[64px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
