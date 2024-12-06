import { Label } from '@radix-ui/react-label'
import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { useSelectedDatesStore } from '@/zustand/useSelectedDatesStore'

export function AdjustUserPointDrawer() {
  const selectedDates = useSelectedDatesStore((state) => state.selectedDates)

  return (
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
                    <span>{selectedDates.join(' / ')}</span>
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
  )
}
