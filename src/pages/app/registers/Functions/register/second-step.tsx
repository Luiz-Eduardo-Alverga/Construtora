import { ArrowLeft } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SecondStepProps {
  setStep: (step: number) => void
  setProgress: (progress: number) => void
  controlName: string
}

const daysOfWeek = [
  {
    id: 'segunda',
    label: 'SEG',
  },
  {
    id: 'terca',
    label: 'TER',
  },
  {
    id: 'quarta',
    label: 'QUA',
  },
  {
    id: 'quinta',
    label: 'QUI',
  },
  {
    id: 'sexta',
    label: 'SEX',
  },
  {
    id: 'sabado',
    label: 'SAB',
  },
  {
    id: 'domingo',
    label: 'DOM',
  },
] as const

export function SecondStep({
  setProgress,
  setStep,
  controlName,
}: SecondStepProps) {
  const {
    control,
    register,
    formState: { isSubmitting },
  } = useFormContext()

  return (
    <div className="space-y-8">
      <span>Selecione os dias da semana de trabalho</span>
      <div>
        <FormField
          control={control}
          name="items"
          render={() => (
            <FormItem className="flex justify-between items-end">
              {daysOfWeek.map((item) => (
                <FormField
                  key={item.id}
                  control={control}
                  name={controlName}
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-col items-center"
                      >
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item.id,
                                    ),
                                  )
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </FormItem>
          )}
        />
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
