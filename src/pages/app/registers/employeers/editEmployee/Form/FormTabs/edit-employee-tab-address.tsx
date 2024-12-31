import { useQuery } from '@tanstack/react-query'
import { SquarePen } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { getSearchCep } from '@/api/utils/search-cep'
import { InputWithMask } from '@/components/ui/input-mask'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { FormContainer } from '../FormLayout/form-container'
import { InputForm } from '../input-form'
import { SelectCityForm } from '../select-city-form'
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

  function isCepFilled() {
    if (address) return true
    return false
  }

  useEffect(() => {
    if (address === null) {
      toast.info(`Nenhum endereço encontrado para o CEP ${cep} informado`)
      setValue('cep', '')
    }

    if (address) {
      setValue('bairro', address.bairro)
      setValue('cidade', address.localidade)
      setValue('endereco', address.logradouro)
      setValue('uf', address.uf)
    }
  })

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
                defaultValue=""
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
            disabled={isCepFilled()}
          />

          <InputForm id="Numero" label="Numero" registerName="numeroEndereco" />
        </FormContainer>
      </div>

      <Separator />

      <FormContainer>
        <InputForm
          id="bairro"
          label="Bairro"
          registerName="bairro"
          defaultValueData={address?.bairro}
          disabled={isCepFilled()}
        />

        <SelectStatesForm
          disabled={isCepFilled()}
          label="UF"
          controlName="uf"
          space="sm:w-40"
        />

        <SelectCityForm
          disabled={isCepFilled()}
          label="Cidade"
          controlName="cidade"
        />

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
