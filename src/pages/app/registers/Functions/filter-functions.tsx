import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const functionsFiltersSchema = z.object({
  nome: z.string(),
})

type FunctionsFiltersSchema = z.infer<typeof functionsFiltersSchema>

export function FilterFunctions() {
  const setSearchParams = useSearchParams()[1]
  const { register, handleSubmit, reset } = useForm<FunctionsFiltersSchema>({
    resolver: zodResolver(functionsFiltersSchema),
  })

  function handleFilterFunctions({ nome }: FunctionsFiltersSchema) {
    setSearchParams((state) => {
      if (nome) {
        state.set('nome', nome)
      } else {
        state.delete('nome')
      }

      return state
    })
  }

  function handleClearFilter() {
    setSearchParams((state) => {
      state.delete('nome')

      return state
    })

    reset()
  }

  return (
    <div className="w-full sm:flex sm:justify-center">
      <form
        onSubmit={handleSubmit(handleFilterFunctions)}
        className="flex flex-col sm:flex-row gap-2"
      >
        <Input
          className="sm:w-80 rounded-3xl"
          placeholder="Pesquise pelo nome da função"
          {...register('nome')}
        />
        <div className="flex gap-2 justify-between">
          <Button className="rounded-full">
            <Search className=" h-5 sm:w-5 text-center" />
            <span className="not-sr-only sm:sr-only">Filtrar resultado</span>
          </Button>

          <Button
            type="button"
            onClick={handleClearFilter}
            variant={'outline'}
            className="rounded-full"
          >
            <X className=" h-5 sm:w-5 text-center" />
            <span className="not-sr-only sm:sr-only">Remover Filtros</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
