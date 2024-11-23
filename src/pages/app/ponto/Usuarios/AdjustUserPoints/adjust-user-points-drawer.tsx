import { ClipboardPen, ListPlus, Printer } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
            <DrawerTrigger className="space-x-2">
              <ClipboardPen />
              <span>Ajustar Pontos</span>
            </DrawerTrigger>
          </DropdownMenuItem>

          <NavLink to={`${parsedEmployeeId}/${dateFrom}/${dateTo}/imprimir`}>
            <DropdownMenuItem className="space-x-2">
              <Printer />

              <span>Imprimir</span>
            </DropdownMenuItem>
          </NavLink>
        </DropdownMenuContent>
      </DropdownMenu>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
