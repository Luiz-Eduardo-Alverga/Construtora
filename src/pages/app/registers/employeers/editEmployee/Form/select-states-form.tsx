import { useQuery } from '@tanstack/react-query'
import { Controller, useFormContext } from 'react-hook-form'

import { getSearchStates } from '@/api/utils/searct-states'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectStatesFormProps {
  label: string
  controlName: string
  space?: string
  disabled?: boolean
}

export function SelectStatesForm({
  label,
  controlName,
  space,
  disabled,
}: SelectStatesFormProps) {
  const { control } = useFormContext()

  const { data: states } = useQuery({
    queryKey: ['states'],
    queryFn: getSearchStates,
  })

  return (
    <div className="space-y-0.5">
      <Label htmlFor="uf">{label}</Label>
      <Controller
        name={controlName}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger className={`w-full ${space}`}>
              <SelectValue placeholder="Selecione a UF" />
            </SelectTrigger>
            <SelectContent>
              {states &&
                states.map((uf) => (
                  <SelectItem key={uf.id} value={uf.sigla}>
                    {uf.nome}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  )
}
