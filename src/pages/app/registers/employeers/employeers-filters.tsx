import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputWithMask } from '@/components/ui/input-mask'
import { Label } from '@/components/ui/label'

export const employeersFiltersSchema = z.object({
  employeeId: z.string().optional(), // Permitindo valor opcional
  employeeName: z.string().optional(),
  employeeCpf: z.string().optional(),
})

type EmployeersFilterSchema = z.infer<typeof employeersFiltersSchema>

export function EmployeersFilters() {
  const setSearchParams = useSearchParams()[1] // Mantendo apenas o setSearchParams
  const {
    register,
    reset,
    handleSubmit,
    control, // Control para usar com Controller
    formState: { isSubmitting },
  } = useForm<EmployeersFilterSchema>({
    resolver: zodResolver(employeersFiltersSchema),
  })

  function handleFilter({
    employeeCpf,
    employeeId,
    employeeName,
  }: EmployeersFilterSchema) {
    // Remove todos os caracteres que não sejam números do CPF
    const sanitizedCpf = employeeCpf ? employeeCpf.replace(/\D/g, '') : ''

    setSearchParams((state) => {
      if (employeeId) {
        state.set('codigoFuncionario', employeeId.toString())
      } else {
        state.delete('codigoFuncionario')
      }

      if (employeeName && employeeName.trim()) {
        state.set('nome', employeeName)
      } else {
        state.delete('nome')
      }

      if (sanitizedCpf && sanitizedCpf.trim()) {
        state.set('cpf', sanitizedCpf)
      } else {
        state.delete('cpf')
      }

      state.delete('page')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('nome')
      state.delete('cpf')
      state.delete('codigoFuncionario')

      state.set('page', '1')

      return state
    })

    reset({
      employeeId: '',
      employeeName: '',
      employeeCpf: '',
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="hidden sm:block">
          <Label className="sr-only">Código</Label>
          <Input
            type="text"
            placeholder="Código"
            className="w-20"
            {...register('employeeId')}
          />
        </div>

        <div>
          <Label className="sr-only">Nome</Label>
          <Input placeholder="Nome" type="text" {...register('employeeName')} />
        </div>

        <div>
          <Label className="sr-only">CPF</Label>
          <Controller
            name="employeeCpf"
            control={control}
            render={({ field }) => (
              <InputWithMask
                mask="999.999.999-99"
                placeholder="CPF"
                {...field} // Usando o field para passar as props corretamente
              />
            )}
          />
        </div>

        <div className="flex gap-2 justify-between">
          <Button type="submit" disabled={isSubmitting}>
            <Search className="w-full mr-2 h-5 sm:w-5" />
            Filtrar resultado
          </Button>

          <Button variant={'outline'} onClick={handleClearFilters}>
            <X className="w-full mr-2 h-5 sm:w-5" /> Remover Filtros
          </Button>
        </div>
      </div>
    </form>
  )
}
