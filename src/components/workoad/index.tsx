import { ArrowLeft } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SelectDaysOfWeek } from '@/components/workoad/select-days-of-week'

import { DialogClose } from '../ui/dialog'

interface WorkloodProps {
  setStep?: (step: number) => void
  setProgress?: (progress: number) => void
  registerName: string
  isBackButtonVisible?: boolean
  isButtonCloseDialog?: boolean
}

export function Workload({
  setProgress,
  setStep,
  registerName,
  isBackButtonVisible = true,
  isButtonCloseDialog = false,
}: WorkloodProps) {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext()

  return (
    <div className="space-y-8">
      <span>Selecione os dias da semana de trabalho</span>
      <div>
        <SelectDaysOfWeek />
      </div>

      <div className="space-y-4">
        <span>Defina o intervalo de horas trabalhadas</span>
        <div className="flex justify-between items-center">
          <Label className="text-xl font-normal">Horas Semanais :</Label>
          <div className="flex gap-2">
            <Input type="number" {...register(registerName)} />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="ml-auto flex gap-2">
          {isBackButtonVisible && (
            <Button
              className="space-x-1"
              variant="outline"
              onClick={() => {
                if (setProgress) setProgress(50)
                if (setStep) setStep(1)
              }}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar</span>
            </Button>
          )}

          {isButtonCloseDialog ? (
            <DialogClose asChild>
              <Button>Confirmar</Button>
            </DialogClose>
          ) : (
            <Button disabled={isSubmitting}>Confirmar</Button>
          )}
        </div>
      </div>
    </div>
  )
}
