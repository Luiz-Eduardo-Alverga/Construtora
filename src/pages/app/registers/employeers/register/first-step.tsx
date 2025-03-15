import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'

import { getFunction } from '@/api/employee-functions/get-function'
import { SelectEmployeeFunctions } from '@/components/employee-function'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useParsedDaysOfWeek } from '@/hooks/use-parsed-days-of-week'

import { RegisterNewEmployeeSchema } from './fields'

interface FirstStepProps {
  onClose: () => void
  setStep: (step: number) => void
  setProgress: (progress: number) => void
}

export function FirstStep({ onClose, setStep, setProgress }: FirstStepProps) {
  const { register, watch, setValue } =
    useFormContext<RegisterNewEmployeeSchema>()

  const nameValue = watch('name')
  const funcaoValue = watch('funcao')

  const { data: functionName } = useQuery({
    queryKey: ['function', funcaoValue],
    queryFn: () => getFunction({ id: String(funcaoValue) || '' }),
    enabled: funcaoValue > 0,
  })

  const parsedDaysOfWeek = useParsedDaysOfWeek(functionName?.data?.diasJornada)

  setValue('daysOfWeek', parsedDaysOfWeek)
  setValue('horasSemanais', functionName?.data?.horasSemanais || '')

  const isInputNameValid = nameValue === undefined || nameValue?.length < 3
  const inFuncaoValueValid = funcaoValue === undefined || funcaoValue === 0
  const isParsedDaysOfWeekValid =
    parsedDaysOfWeek === undefined || parsedDaysOfWeek.length < 0

  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="username">*Nome</Label>
        <Input
          id="username"
          className="col-span-3"
          type="text"
          {...register('name')}
        />
      </div>

      <div className="space-y-1">
        <Label>*Função</Label>
        <div className="col-span-3">
          <SelectEmployeeFunctions
            controlName="funcao"
            isDefaultLabelHidden={true}
          />
        </div>
      </div>

      <div className="ml-auto space-x-2">
        <DialogClose asChild onClick={onClose}>
          <Button className="ml-auto" variant="outline">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          disabled={
            isInputNameValid || inFuncaoValueValid || isParsedDaysOfWeekValid
          }
          onClick={() => {
            setStep(2)
            setProgress(100)
          }}
          type="button"
          className="ml-auto"
        >
          Prosseguir
        </Button>
      </div>
    </>
  )
}
