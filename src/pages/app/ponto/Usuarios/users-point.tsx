import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { PopoverContent } from '@radix-ui/react-popover'
import { addDays, format as formatDate } from 'date-fns'
import { CalendarIcon, FileClock } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const searchEmployeePointsSchema = z.object({
  name: z.string(),
})

type SearchEmployeePointsForm = z.infer<typeof searchEmployeePointsSchema>

export function UsersPoint() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 10, 20), 20),
  })

  const { register, handleSubmit } = useForm<SearchEmployeePointsForm>({
    resolver: zodResolver(searchEmployeePointsSchema),
  })

  const onSubmit = (data: SearchEmployeePointsForm) => {
    // Adiciona as datas ao objeto de dados
    const dataWithDate = {
      ...data,
      from: date?.from ? formatDate(date.from, 'yyyy-MM-dd') : '',
      to: date?.to ? formatDate(date.to, 'yyyy-MM-dd') : '',
    }

    console.log(dataWithDate)
    // Aqui você pode fazer algo com os dados, como enviá-los para um servidor
  }

  return (
    <div className="pl-4 pt-4 space-y-10">
      <div className="flex flex-row items-center gap-2">
        <h1 className="text-2xl font-medium">Listagem de Pontos</h1>
        <FileClock className="h-8 w-8 text-primary" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Label className="font-normal">Nome do funcionário</Label>
        <div className="flex gap-3 pt-2">
          <Input className="w-64" {...register('name')} />

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

            <PopoverContent className="w-auto p-0" align="start">
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
    </div>
  )
}
