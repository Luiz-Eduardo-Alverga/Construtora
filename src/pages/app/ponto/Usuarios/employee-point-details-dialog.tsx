import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface EmployeePointDetailsDialogProps {
  HoraInicio: string
  HoraAlmoco: string
  HoraRetorno: string
  HoraFim: string
}

export function EmployeePointDetailsDialog({
  HoraInicio,
  HoraAlmoco,
  HoraRetorno,
  HoraFim,
}: EmployeePointDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes dos pontos</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">Horarios</DialogTitle>
          <DialogDescription className="text-left">
            Listagem dos seus Pontos
          </DialogDescription>
        </DialogHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Hora Inicio</TableCell>
              <TableCell>Hora Almoço</TableCell>
              <TableCell>Hora Retorno</TableCell>
              <TableCell>Hora Fim</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{HoraInicio}</TableCell>
              <TableCell>{HoraAlmoco}</TableCell>
              <TableCell>{HoraRetorno}</TableCell>
              <TableCell>{HoraFim}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}
