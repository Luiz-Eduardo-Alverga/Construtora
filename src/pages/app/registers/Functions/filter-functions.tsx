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
  const { register, handleSubmit } = useForm<FunctionsFiltersSchema>({
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
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(handleFilterFunctions)}
        className="flex gap-2"
      >
        <Input
          className="w-64 sm:w-80 rounded-3xl"
          placeholder="Pesquise pelo nome da função"
          {...register('nome')}
        />
        <Button className="rounded-full">
          <Search className=" h-5 sm:w-5 text-center" />
        </Button>

        <Button
          type="button"
          onClick={handleClearFilter}
          variant={'outline'}
          className="rounded-full"
        >
          <X className=" h-5 sm:w-5 text-center" />
        </Button>
      </form>
    </div>
  )
}
