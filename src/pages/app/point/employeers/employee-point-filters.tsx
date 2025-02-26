import { zodResolver } from '@hookform/resolvers/zod'
import { endOfMonth, format as formatDate, startOfMonth } from 'date-fns'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { EmployeeAutocomplete } from '@/components/autocomplete/employee'
import { CalendarPicker } from '@/components/calendars/calendar-picker-range'
import { Button } from '@/components/ui/button'

const searchEmployeePointsSchema = z.object({
  employeeName: z.string(),
})

type SearchEmployeePointsForm = z.infer<typeof searchEmployeePointsSchema>

export function EmployeePontFilters() {
  const today = new Date()
  const firstDayOfMonth = startOfMonth(today)
  const lastDayOfMonth = endOfMonth(today)
  const [date, setDate] = useState<DateRange | undefined>({
    from: firstDayOfMonth,
    to: lastDayOfMonth,
  })

  const [employeeId, setEmployeeId] = useState<number | null>(null)

  const setSearchParams = useSearchParams()[1]

  const form = useForm<SearchEmployeePointsForm>({
    resolver: zodResolver(searchEmployeePointsSchema),
    defaultValues: {
      employeeName: '',
    },
  })

  function handleFilter({ employeeName }: SearchEmployeePointsForm) {
    if (!employeeName) {
      toast.warning('Preencha o funcionário')
      return
    }

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
    <FormProvider {...form}>
      <form
        className="flex flex-col lg:flex-row lg:items-end gap-2"
        onSubmit={form.handleSubmit(handleFilter)}
      >
        <EmployeeAutocomplete setEmployeeId={setEmployeeId} />

        <CalendarPicker date={date} setDate={setDate} />

        <Button type="submit">
          <Search className="mr-2 h-5 sm:w-5" />
          Buscar resultado
        </Button>
      </form>
    </FormProvider>
  )
}
