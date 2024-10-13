import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

export type EmployeePoints = {
  Data: string
  HoraInicio: string | null
  HoraAlmoco: string | null
  HoraRetorno: string | null
  HoraFim: string | null
}

export const columns: ColumnDef<EmployeePoints>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'Data',
    header: 'Data',
  },
  {
    accessorKey: 'HoraInicio',
    header: 'Hora de Inicio',
    cell: ({ row }) => {
      const horaInicio = row.original.HoraInicio
      return horaInicio || 'N/I'
    },
  },
  {
    accessorKey: 'HoraAlmoco',
    header: 'Hora de Almoço',
    cell: ({ row }) => {
      const horaAlmoco = row.original.HoraAlmoco
      return horaAlmoco || 'N/I'
    },
  },
  {
    accessorKey: 'HoraRetorno',
    header: 'Hora de Retorno',
    cell: ({ row }) => {
      const horaRetorno = row.original.HoraRetorno
      return horaRetorno || 'N/I'
    },
  },
  {
    accessorKey: 'HoraFim',
    header: 'Hora Fim',
    cell: ({ row }) => {
      const horaFim = row.original.HoraFim
      return horaFim || 'N/I'
    },
  },
]
