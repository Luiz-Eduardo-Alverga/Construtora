import { Controller, useFormContext } from 'react-hook-form'

import { CalendarSingleDatePicker } from '@/components/calendars/calendar-picker-single'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useDateStore } from '@/zustand/useSelectedDatesStore'

import { FormContainer } from '../FormLayout/form-container'
import { InputForm } from '../input-form'
import { SelectStatesForm } from '../select-states-form'

export function EditEmployeeInformationTabs() {
  const { control } = useFormContext()

  const {
    selectedDateBirth,
    setSelectedDateBirth,
    selectedDateResignation,
    setSelectedDateResignation,
  } = useDateStore()

  return (
    <div className="space-y-2">
      <div className="py-4">
        <FormContainer>
          <InputForm
            id="cidadeNasc"
            registerName="cidadeNasc"
            label="Cidade de Nascimento"
            allspace="flex-1"
          />

          <SelectStatesForm
            label="UF Nascimento"
            controlName="ufNasc"
            space="sm:w-56"
          />
        </FormContainer>
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pb-4">
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

        <SelectStatesForm controlName="ufRG" label="UF RG" />

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
