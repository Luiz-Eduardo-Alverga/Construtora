import { useQuery } from '@tanstack/react-query'
import { SquarePen } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import { getSearchCep } from '@/api/search-cep'
import { InputWithMask } from '@/components/ui/input-mask'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { InputForm } from './Inputs/input-form'

// Objeto com as UFs
export const ufs = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  // (demais UFs omitidas para brevidade)
]

export function EditEmployeeAddressTab() {
  const { watch, control, setValue } = useFormContext()

  const cep = watch('cep')

  const clearCpf = cep ? cep.replace(/\D/g, '') : ''

  const { data: address } = useQuery({
    queryKey: ['SearchCep', clearCpf],
    queryFn: () => getSearchCep({ cep: clearCpf }),
    enabled: clearCpf.length === 8,
  })

  if (address) {
    setValue('bairro', address.bairro)
    setValue('cidade', address.localidade)
    setValue('endereco', address.logradouro)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <div className="space-y-0.5">
          <Label htmlFor="cep">CEP</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Controller
              name="cep"
              control={control}
              render={({ field }) => (
                <InputWithMask
                  mask="99999-999"
                  placeholder="CEP"
                  className="w-full sm:w-60"
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <InputForm
          id="endereco"
          label="Endereço"
          registerName="endereco"
          allspace="flex-1"
          defaultValueData={address?.logradouro}
        />

        <InputForm id="Numero" label="Numero" registerName="numeroEndereco" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <InputForm
          id="bairro"
          label="Bairro"
          registerName="bairro"
          defaultValueData={address?.bairro}
        />

        <InputForm
          id="cidade"
          label="Cidade"
          registerName="cidade"
          defaultValueData={address?.localidade}
        />

        <div className="space-y-0.5">
          <Label htmlFor="uf">UF</Label>
          <Controller
            name="uf"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Selecione a UF" />
                </SelectTrigger>
                <SelectContent>
                  {ufs.map((uf) => (
                    <SelectItem key={uf.value} value={uf.value}>
                      {uf.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <InputForm
          id="Complemento"
          label="Complemento"
          registerName="complemento"
          allspace="flex-1"
        />
      </div>
    </div>
  )
}
