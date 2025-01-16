import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { AdjustPoints } from '@/api/employeePoints/adjust-point'
import optionsImage from '@/assets/optionsImage.svg'
import { Button } from '@/components/ui/button'
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useSelectedDatesStore } from '@/zustand/useSelectedDatesStore'

import { InsertJustify } from './options/insert-justify'

const adjustEmployeePointsSchema = z.object({
  justificativa: z.string(),
})

type AdjustEmployeePointsSchema = z.infer<typeof adjustEmployeePointsSchema>

interface AdjustUserPointDrawerProps {
  employeeId: number
  onClose: () => void
}

export function AdjustUserPointDrawer({
  employeeId,
  onClose,
}: AdjustUserPointDrawerProps) {
  const [options, setOptions] = useState(0)

  const adjustEmployeePointsForm = useForm<AdjustEmployeePointsSchema>({
    resolver: zodResolver(adjustEmployeePointsSchema),
  })

  const { mutateAsync: adjustEmployeePoints } = useMutation({
    mutationFn: AdjustPoints,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['employeePoints'],
        refetchType: 'active',
      })
    },
  })

  const queryClient = useQueryClient()

  const selectedDates = useSelectedDatesStore((state) => state.selectedDates)

  async function handleAdjustEmployeePoints({
    justificativa,
  }: AdjustEmployeePointsSchema) {
    try {
      await adjustEmployeePoints({
        idFuncionario: employeeId,
        idOperacao: options,
        justificativa,
        datas: selectedDates,
      })
      onClose()
      toast.success('Posto (s) ajustados com sucesso')
    } catch {
      toast.error('Erro ao ajustar ponto')
    }
  }

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
                  onClick={() => setOptions(1)}
                  variant={'ghost'}
                  className="bg-secondary flex justify-between w-72 h-14 rounded-none px-2 hover:bg-primary hover:text-white"
                >
                  <span>Inserir Falta</span>
                  <ChevronRight />
                </Button>
                <Button
                  onClick={() => setOptions(2)}
                  variant={'ghost'}
                  className="bg-secondary flex justify-between w-72 h-14 rounded-none px-2 hover:bg-primary hover:text-white"
                >
                  <span>Inserir Atestado</span>
                  <ChevronRight />
                </Button>
                <Button
                  onClick={() => setOptions(3)}
                  variant={'ghost'}
                  className="bg-secondary flex justify-between w-72 h-14 rounded-none px-2 hover:bg-primary hover:text-white"
                >
                  <span>Inserir Férias</span>
                  <ChevronRight />
                </Button>
              </div>
            </div>

            <FormProvider {...adjustEmployeePointsForm}>
              <form
                onSubmit={adjustEmployeePointsForm.handleSubmit(
                  handleAdjustEmployeePoints,
                )}
              >
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
                    {options === 0 && (
                      <div className="flex items-center  text-lg justify-between pt-2">
                        <img className="h-32 w-32" src={optionsImage} alt="" />
                        <div className="flex items-center justify-center flex-col">
                          <span>Selecione uma das opções</span>
                          <span>ao lado</span>
                        </div>
                      </div>
                    )}

                    {options === 1 && (
                      <>
                        <InsertJustify label="Falta" />
                      </>
                    )}

                    {options === 2 && (
                      <>
                        <InsertJustify label="Atestado" />
                      </>
                    )}

                    {options === 3 && (
                      <>
                        <InsertJustify label="Férias" />
                      </>
                    )}
                  </div>
                </div>

                <Button className="w-full mt-2">Confirmar</Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </DrawerContent>
  )
}
