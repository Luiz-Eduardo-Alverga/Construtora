import { useQuery } from '@tanstack/react-query'
import { SquarePen } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import { getSearchCep } from '@/api/utils/search-cep'
import { InputWithMask } from '@/components/ui/input-mask'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { FormContainer } from '../FormLayout/form-container'
import { InputForm } from '../input-form'
import { SelectStatesForm } from '../select-states-form'

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
    setValue('uf', address.uf)
  }

  return (
    <div className="space-y-4">
      <div className="py-2">
        <FormContainer>
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

          <InputForm        
            id="Numero"
            label="Numero"
            registerName="numeroEndereco"        
          />
        </FormContainer>
      </div>

      <Separator />

      <FormContainer>
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

        <SelectStatesForm label="UF" controlName="uf" space="sm:w-40" />

        <InputForm
          id="Complemento"
          label="Complemento"
          registerName="complemento"
          allspace="flex-1"
        />
      </FormContainer>
    </div>
  )
}
