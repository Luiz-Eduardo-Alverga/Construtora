import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, formatDate } from 'date-fns'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { CalendarPicker } from '@/components/calendar-picker'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface EmployeersProps {
  employeers:
    | {
        id: number | null
        Nome: string | null
      }[]
    | undefined
}

const searchEmployeePointsSchema = z.object({
  employeeName: z.string(),
})

type SearchEmployeePointsForm = z.infer<typeof searchEmployeePointsSchema>

export function EmployeePontFilters({ employeers }: EmployeersProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  })

  const [employeeId, setEmployeeId] = useState(1)

  const [searchParams, setSearchParams] = useSearchParams()
  const employeeName = searchParams.get('employeeId') || ''

  const form = useForm<SearchEmployeePointsForm>({
    resolver: zodResolver(searchEmployeePointsSchema),
    defaultValues: {
      employeeName,
    },
  })

  function handleFilter({ employeeName }: SearchEmployeePointsForm) {
    const formattedFromDate = date?.from
      ? formatDate(date.from, 'yyyy-MM-dd')
      : ''
    const formattedToDate = date?.to ? formatDate(date.to, 'yyyy-MM-dd') : ''

    setSearchParams((state) => {
      if (employeeName) {
        state.set('employeeId', employeeId.toString())
      } else {
        state.delete('employeeName')
      }

      if (formattedFromDate) {
        state.set('dataInicio', formattedFromDate)
      } else {
        state.delete('dataInicio')
      }

      if (formattedToDate) {
        state.set('dataFim', formattedToDate)
      } else {
        state.delete('dataFim')
      }

      return state
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFilter)}>
        <FormField
          control={form.control}
          name="employeeName"
          render={({ field }) => (
            <FormItem className="flex gap-3 pt-2 flex-col sm:flex-row">
              <FormLabel className="sr-only">Funcionários</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      role="combobox"
                      className={cn(
                        'w-full sm:w-[300px] justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? employeers?.find(
                            (employee) => employee.Nome === field.value,
                          )?.Nome
                        : 'Selecione o Funcionario'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-full sm:w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Informe o funcionario" />
                    <CommandList>
                      <CommandEmpty>Funcionario não encontrado</CommandEmpty>
                      <ScrollArea className="w-full h-72 rounded-md border">
                        <CommandGroup>
                          {employeers && employeers.length > 0 ? (
                            employeers.map((employee) => (
                              <CommandItem
                                value={employee.Nome ?? ''}
                                key={employee.id}
                                onSelect={() => {
                                  form.setValue(
                                    'employeeName',
                                    employee.Nome ?? '',
                                  )
                                  setEmployeeId(employee.id ?? 1)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    employee.Nome === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {employee.Nome}
                              </CommandItem>
                            ))
                          ) : (
                            <CommandItem disabled>
                              Nenhum funcionário disponível
                            </CommandItem>
                          )}
                        </CommandGroup>
                      </ScrollArea>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <CalendarPicker date={date} setDate={setDate} />

              <Button
                disabled={form.formState.isSubmitting}
                className="p-5 w-full sm:w-32"
                type="submit"
              >
                Buscar
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
