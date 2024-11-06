import { ClipboardPen, ListPlus, Printer } from 'lucide-react'
import { Link } from 'react-router-dom'

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

interface MoreOptionsProps {
  parsedEmployeeId?: number | undefined
  dateTo?: string | null
  dateFrom?: string | null
}

export function AdjustEmployeePoints({
  parsedEmployeeId,
  dateFrom,
  dateTo,
}: MoreOptionsProps) {
  return (
    <Drawer>
      <DropdownMenu>
        <DropdownMenuTrigger className="mt-2">
          <Button variant={'outline'} className="space-x-2">
            <ListPlus />
            <span> Mais Opções</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <DrawerTrigger className="space-x-2">
              <ClipboardPen />
              <span>Ajustar Pontos</span>
            </DrawerTrigger>
          </DropdownMenuItem>

          <DropdownMenuItem className="space-x-2">
            <Printer />
            <Link to={`${parsedEmployeeId}/${dateFrom}/${dateTo}/imprimir`}>
              <span>Imprimir</span>
            </Link>
          </DropdownMenuItem>
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
