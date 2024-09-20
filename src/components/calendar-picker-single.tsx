import { format as formatDate } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface SingleDatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function CalendarSingleDatePicker({
  date,
  setDate,
}: SingleDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            formatDate(date, 'dd/MM/yyyy')
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 z-50 bg-white dark:bg-black rounded-md"
        align="start"
      >
        <Calendar
          initialFocus
          mode="single"
          defaultMonth={new Date()}
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  )
}
