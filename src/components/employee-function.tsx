import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { getEmployeeFunctions } from '@/api/employee-functions/get-functions'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectEmployeeFunctionsProps {
  controlName: string
  isDefaultLabelHidden?: boolean
  space?: string
  defaultValue?: number | null
}

export function SelectEmployeeFunctions({
  controlName,
  isDefaultLabelHidden = false,
  space,
  defaultValue,
}: SelectEmployeeFunctionsProps) {
  const { control, setValue } = useFormContext()
  const { data: employeeFunctions, isLoading } = useQuery({
    queryKey: ['getEmployeeFunctions'],
    queryFn: () => getEmployeeFunctions({ funcao: '' }),
  })

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setValue(controlName, defaultValue)
    }
  }, [defaultValue, controlName, setValue])

  function identifyFunction(idFuction: number) {
    const employeeFunction = employeeFunctions?.data.find(
      (func) => func.id === idFuction,
    )

    if (employeeFunction) {
      return employeeFunction.nome
    }

    return null
  }

  return (
    <div className="space-y-0.5">
      <Label className={isDefaultLabelHidden ? 'hidden' : ''}>Função</Label>

      <Controller
        name={controlName}
        control={control}
        defaultValue={defaultValue || 0}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={String(field.value)}>
            <SelectTrigger className={`w-full ${space}`}>
              <SelectValue placeholder="Selecione a Função">
                {field.value
                  ? identifyFunction(Number(field.value))
                  : 'Selecione a Função'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {isLoading ? (
                  <SelectItem value="Carregando...">Carregando...</SelectItem>
                ) : (
                  employeeFunctions?.data &&
                  employeeFunctions?.data.length > 0 &&
                  employeeFunctions.data.map((employeeFunction) => (
                    <SelectItem
                      key={employeeFunction.id}
                      value={String(employeeFunction.id)}
                    >
                      {employeeFunction.nome}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  )
}
