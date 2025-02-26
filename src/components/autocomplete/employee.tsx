import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { getEmplooyers } from '@/api/employee/get-employeers'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ScrollArea } from '../ui/scroll-area'

interface EmployeeAutcompleteProps {
  setEmployeeId: (id: number | null) => void
}

export function EmployeeAutocomplete({
  setEmployeeId,
}: EmployeeAutcompleteProps) {
  const { control, setValue } = useFormContext()

  const searchParams = useSearchParams()[0]

  const initialEmployeeId = searchParams.get('employeeId') || ''

  const { data: employeers, isLoading } = useQuery({
    queryKey: ['Employeers'],
    queryFn: getEmplooyers,
  })

  useEffect(() => {
    if (initialEmployeeId) {
      const employee = employeers?.data.find(
        (emp) => emp.id?.toString() === initialEmployeeId,
      )
      if (employee) {
        setValue('employeeName', employee.nome ?? '')
        setEmployeeId(employee.id)
      }
    }
  }, [initialEmployeeId, employeers, setValue, setEmployeeId])

  return (
    <FormField
      control={control}
      name="employeeName"
      render={({ field }) => (
        <FormItem className="flex gap-3 flex-col sm:flex-row">
          <FormLabel className="sr-only">Funcionários</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  role="combobox"
                  className={cn(
                    'w-full lg:w-[300px] justify-between',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {field.value
                    ? employeers?.data.find(
                        (employee) => employee.nome === field.value,
                      )?.nome
                    : 'Selecione o Funcionário'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-full sm:w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Informe o funcionário" />
                <CommandList>
                  <CommandEmpty>Funcionário não encontrado</CommandEmpty>
                  <ScrollArea className="w-full  rounded-md border">
                    <CommandGroup>
                      {isLoading && <CommandItem>Carregando</CommandItem>}
                      {employeers &&
                        employeers?.data.map((employee) => (
                          <CommandItem
                            value={employee.nome ?? ''}
                            key={employee.id}
                            onSelect={() => {
                              setValue('employeeName', employee.nome ?? '')
                              setEmployeeId(employee.id ?? null)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                employee.nome === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {employee.nome}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}
