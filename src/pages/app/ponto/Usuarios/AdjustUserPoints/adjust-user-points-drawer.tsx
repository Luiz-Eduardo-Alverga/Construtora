import { ClipboardPen, ListPlus, Printer } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSelectedDatesStore } from '@/zustand/useSelectedDatesStore'

import { AdjustUserPointDrawer } from './adjust-user-point-drawer'

interface OptionsToEmployeePointsProps {
  parsedEmployeeId?: number | undefined
  dateTo?: string | null
  dateFrom?: string | null
}

export function OptionsToEmployeePoints({
  parsedEmployeeId,
  dateFrom,
  dateTo,
}: OptionsToEmployeePointsProps) {
  const selectedDates = useSelectedDatesStore((state) => state.selectedDates)
  // Função para exibir Toast

  const handleAdjustPointsClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (selectedDates.length === 0) {
      event.preventDefault() // Impede a abertura do Drawer
      toast.info('Selecione pelo menos uma data')
    }
  }

  return (
    <Drawer>
      <DropdownMenu>
        <DropdownMenuTrigger className="mt-2">
          <Button variant={'outline'} className="space-x-2 w-full">
            <ListPlus />
            <span> Mais Opções</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem asChild>
            <DrawerTrigger
              className="space-x-2"
              asChild
              onClick={handleAdjustPointsClick}
            >
              <Button variant="ghost">
                <ClipboardPen />
                <span>Ajustar Pontos</span>
              </Button>
            </DrawerTrigger>
          </DropdownMenuItem>

          <NavLink
            target="_blank"
            to={`${parsedEmployeeId}/${dateFrom}/${dateTo}/imprimir`}
          >
            <DropdownMenuItem className="space-x-2">
              <Printer />
              <span>Imprimir</span>
            </DropdownMenuItem>
          </NavLink>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdjustUserPointDrawer />
    </Drawer>
  )
}
