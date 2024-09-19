import { SquarePen } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { InputWithMask } from '@/components/ui/input-mask'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Objeto com as UFs
const ufs = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

export function EditEmployeeAddressTab() {
  const { control } = useForm()

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <div className="space-y-0.5 relative">
          <Label htmlFor="codigoPonto">CEP</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Controller
              name="CEP"
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

        <div className="space-y-0.5 flex-1 relative">
          <Label htmlFor="codigoPonto">Endereço</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="codigoPonto" />
          </div>
        </div>

        <div className="space-y-0.5  relative">
          <Label htmlFor="Numero">Numero</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="Numero" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <div className="space-y-0.5">
          <Label htmlFor="bairro">Bairro</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="bairro" />
          </div>
        </div>
        <div className="space-y-0.5">
          <Label htmlFor="cidade">Cidade</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="cidade" />
          </div>
        </div>
        <div className="space-y-0.5">
          <Label htmlFor="uf">UF</Label>
          <Controller
            name="UF"
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
        <div className="space-y-0.5 flex-1">
          <Label htmlFor="complemento">Complemento</Label>
          <div className="relative">
            <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input id="complemento" />
          </div>
        </div>
      </div>
    </div>
  )
}
