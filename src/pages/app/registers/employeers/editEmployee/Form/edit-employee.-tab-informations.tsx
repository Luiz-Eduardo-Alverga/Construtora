import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { CalendarSingleDatePicker } from '@/components/calendar-picker-single' // Certifique-se de que o nome do componente é `SingleDatePicker`
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { InputForm } from './input-form'
import { SelectStatesForm } from './select-states-form'
import { FormContainer } from './form-container'

export function EditEmployeeInformationTabs() {
  const [selectedDateBirth, setSelectedDateBirth] = useState<Date | undefined>(
    undefined,
  )
  const [selectedDateResignation, setSelectedDateResignation] = useState<
    Date | undefined
  >(undefined)

  const { control } = useFormContext()

  return (
    <div className="space-y-2">
      <div className='py-4'>
        <FormContainer>
          <InputForm
            id="cidadeNascimento"
            registerName="cidadeNascimento"
            label="Cidade de Nascimento"
            allspace="flex-1"
          />

          <SelectStatesForm
            label="UF Nascimento"
            controlName="ufNascimento"
            space="sm:w-56"
          />
        </FormContainer>
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pb-2 pb-4">
        <InputForm
          id="Nome do Pai"
          registerName="nomePai"
          label="Nome do Pai"
        />

        <InputForm
          id="Nome da Mãe"
          registerName="nomeMae"
          label="Nome da Mãe"
        />

        <div>
          <Label>Data de Nascimento</Label>
          <Controller
            name="dataNascimento"
            control={control}
            render={({ field }) => (
              <CalendarSingleDatePicker
                date={selectedDateBirth}
                setDate={setSelectedDateBirth}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pb-2 ">
        <InputForm id="RG" registerName="rg" label="RG" />

        <InputForm id="Serie" registerName="serie" label="Serie" />

        <InputForm
          id="Orgao Emissor"
          registerName="orgaoEmissor"
          label="Orgao Emissor"
        />

        <SelectStatesForm controlName="ufRg" label="UF RG" />

        <InputForm id="Esocial" registerName="esocial" label="Esocial" />

        <InputForm id="CTPS" registerName="ctps" label="CTPS" />

        <div>
          <Label>Data de Demissão</Label>
          <CalendarSingleDatePicker
            date={selectedDateResignation}
            setDate={setSelectedDateResignation}
          />
        </div>

        <InputForm id="CPF" registerName="cpf" label="CPF" />
      </div>
    </div>
  )
}
