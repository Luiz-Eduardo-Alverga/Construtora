import { useQuery } from '@tanstack/react-query'
import { Controller, useFormContext } from 'react-hook-form'

import { getEmployeeFunctions } from '@/api/get-functions'
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
  const { control } = useFormContext()
  const { data: employeeFunctions, isLoading } = useQuery({
    queryKey: ['getEmployeeFunctions'],
    queryFn: getEmployeeFunctions,
  })

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
        defaultValue={defaultValue || ''}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
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
