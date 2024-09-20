import { SquarePen } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { CalendarSingleDatePicker } from '@/components/calendar-picker-single' // Certifique-se de que o nome do componente é `SingleDatePicker`
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

import { ufs } from './edit-employee-tab-address'

export function EditEmployeeInformationTabs() {
  const { control } = useForm()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <div className="space-y-0.5 flex-1 relative">
          <Label htmlFor="codigoPonto">Cidade Nascimento</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="codigoPonto" />
          </div>
        </div>

        <div className="space-y-0.5  relative">
          <Label htmlFor="Numero">UF nascimento</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Controller
              name="UF"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full sm:w-56">
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pb-2 sm:pb-6">
        <div className="space-y-0.5">
          <Label htmlFor="Nome do Pai">Nome do Pai</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="Nome do Pai" />
          </div>
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="Nome da Mae">Nome da Mãe</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="Nome da Mae" />
          </div>
        </div>

        <div>
          <Label>Data de Nascimento</Label>
          <CalendarSingleDatePicker
            date={selectedDate}
            setDate={setSelectedDate}
          />
        </div>
      </div>
      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pb-2 sm:pt-6">
        <div className="space-y-0.5">
          <Label htmlFor="RG">RG</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="RG" />
          </div>
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="EmissaoRG">Emissão RG</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="EmissaoRG" />
          </div>
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="Serie">Serie</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="Serie" />
          </div>
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="Orgao Emissor">Orgão Emissor</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="Orgao Emissor" />
          </div>
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="Serie">UF RG</Label>
          <div className="relative">
            <Controller
              name="UF"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
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
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="Esocial">Esocial</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="Esocial" />
          </div>
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="CTPS">CTPS</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="CTPS" />
          </div>
        </div>

        <div>
          <Label>Data de Demissão</Label>
          <CalendarSingleDatePicker
            date={selectedDate}
            setDate={setSelectedDate}
          />
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="CPF">CPF</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="CPF" />
          </div>
        </div>
      </div>
    </div>
  )
}
