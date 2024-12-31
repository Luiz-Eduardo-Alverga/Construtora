import { ArrowLeft } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { SelectDaysOfWeek } from '../form/select-days-of-week'

interface SecondStepProps {
  setStep: (step: number) => void
  setProgress: (progress: number) => void
}

export function SecondStep({ setProgress, setStep }: SecondStepProps) {
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
            <Input type="number" {...register('horasSemanais')} />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="ml-auto flex gap-2">
          <Button
            className="space-x-1"
            variant={'outline'}
            onClick={() => {
              setProgress(50)
              setStep(1)
            }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </Button>

          <Button disabled={isSubmitting}>Confirmar</Button>
        </div>
      </div>
    </div>
  )
}
