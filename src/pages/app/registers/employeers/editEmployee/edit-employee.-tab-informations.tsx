import { useQuery } from '@tanstack/react-query'
import { SquarePen } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { getSearchStates } from '@/api/utils/searct-states'
import { CalendarSingleDatePicker } from '@/components/calendar-picker-single' // Certifique-se de que o nome do componente é `SingleDatePicker`
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

import { InputForm } from './Inputs/input-form'

export function EditEmployeeInformationTabs() {
  const [selectedDateBirth, setSelectedDateBirth] = useState<Date | undefined>(
    undefined,
  )
  const [selectedDateResignation, setSelectedDateResignation] = useState<
    Date | undefined
  >(undefined)

  const { control } = useFormContext()

  const { data: states } = useQuery({
    queryKey: ['states'],
    queryFn: getSearchStates,
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <InputForm
          id="cidadeNascimento"
          registerName="cidadeNascimento"
          label="Cidade de Nascimento"
          allspace="flex-1"
        />

        <div className="space-y-0.5  relative">
          <Label htmlFor="Numero">UF nascimento</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Controller
              name="ufNascimento"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full sm:w-56">
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pb-2 sm:pb-6">
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
          <CalendarSingleDatePicker
            date={selectedDateBirth}
            setDate={setSelectedDateBirth}
          />
        </div>
      </div>
      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pb-2 sm:pt-6">
        <InputForm id="RG" registerName="rg" label="RG" />

        <InputForm id="EmissaoRG" registerName="emissaoRg" label="EmissaoRG" />

        <InputForm id="Serie" registerName="serie" label="Serie" />

        <InputForm
          id="Orgao Emissor"
          registerName="orgaoEmissor"
          label="Orgao Emissor"
        />

        <div className="space-y-0.5">
          <Label htmlFor="Serie">UF RG</Label>
          <div className="relative">
            <Controller
              name="ufRg"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
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
        </div>

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
