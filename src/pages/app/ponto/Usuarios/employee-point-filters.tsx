import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { PopoverContent } from '@radix-ui/react-popover'
import { addDays, format as formatDate } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const searchEmployeePointsSchema = z.object({
  employeeId: z.number().nonnegative(),
})

type SearchEmployeePointsForm = z.infer<typeof searchEmployeePointsSchema>

export function EmployeePontFilters() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 10, 20), 20),
  })

  const [searchParams, setSearchParams] = useSearchParams()

  const employeeId = searchParams.get('employeeId')
  const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined

  const { register, handleSubmit } = useForm<SearchEmployeePointsForm>({
    resolver: zodResolver(searchEmployeePointsSchema),
    defaultValues: {
      employeeId: parsedEmployeeId,
    },
  })

  function handleFilter({ employeeId }: SearchEmployeePointsForm) {
    const formattedFromDate = date?.from
      ? formatDate(date.from, 'yyyy-MM-dd')
      : ''
    const formattedToDate = date?.to ? formatDate(date.to, 'yyyy-MM-dd') : ''

    setSearchParams((state) => {
      if (employeeId) {
        state.set('employeeId', employeeId.toString())
      } else {
        state.delete('employeeId')
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
    <form onSubmit={handleSubmit(handleFilter)}>
      <Label className="font-normal text-sm">Nome do funcionário</Label>
      <div className="flex gap-3 pt-2">
        <Input
          className="w-64"
          type="number"
          {...register('employeeId', { valueAsNumber: true })}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                'w-[300px] justify-start text-left font-normal',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {formatDate(date.from, 'LLL dd, y')} -{' '}
                    {formatDate(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  formatDate(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Selecione uma data</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto p-0 z-50 bg-secondary rounded-md"
            align="start"
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Button type="submit" className="p-5">
          Buscar
        </Button>
      </div>
    </form>
  )
}
