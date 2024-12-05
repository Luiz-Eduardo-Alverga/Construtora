import { Label } from '@radix-ui/react-label'
import { ChevronRight, ClipboardPen, ListPlus, Printer } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

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

      <DrawerContent className="h-[400px]">
        <div className=" m-auto h-full flex justify-between py-4">
          <div>
            <DrawerHeader className="p-0">
              <DrawerTitle>Ajustar Pontos</DrawerTitle>
            </DrawerHeader>

            <div className="flex justify-between mt-8 w-[800px] items-start">
              <div className="flex justify-between">
                <div className="space-y-2 ">
                  <Button
                    variant={'ghost'}
                    className="bg-slate-50 flex justify-between w-72 h-14 rounded-none px-2 hover:bg-primary hover:text-white"
                  >
                    <span>Inserir Falta</span>
                    <ChevronRight />
                  </Button>
                  <Button
                    variant={'ghost'}
                    className="bg-slate-50 flex justify-between w-72 h-14 rounded-none px-2 hover:bg-primary hover:text-white"
                  >
                    <span>Inserir Atestado</span>
                    <ChevronRight />
                  </Button>
                  <Button
                    variant={'ghost'}
                    className="bg-slate-50 flex justify-between w-72 h-14 rounded-none px-2 hover:bg-primary hover:text-white"
                  >
                    <span>Inserir Férias</span>
                    <ChevronRight />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <Label>Datas Selecionadas</Label>
                  <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
                    <div className="flex h-10 p-4 items-center ">
                      <span>
                        [01/12/2024 / 02/12/2024 / 03/12/2024 / 04/12/2024 /
                        05/12/2024 / 06/12/2024 / 07/12/2024 / 08/12/2024 /
                        09/12/2024 / 10/12/2024]
                      </span>
                      <ScrollBar orientation="horizontal" />
                    </div>
                  </ScrollArea>
                </div>
                <div>
                  <Label>Justificativa</Label>
                  <Textarea className="mt-1 resize-none"></Textarea>
                </div>
              </div>
            </div>
          </div>

          {/* <DrawerFooter className="w-full ">
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
