import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { getSearchCity } from '@/api/utils/search-city'
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
import { cn } from '@/lib/utils'

interface SelectStatesFormProps {
  label: string
  controlName: string
  disabled?: boolean
}

export function SelectCityForm({
  label,
  controlName,
  disabled,
}: SelectStatesFormProps) {
  const { control, setValue, getValues } = useFormContext()

  const uf = getValues('uf')

  const { data: citys, isLoading } = useQuery({
    queryKey: ['citys'],
    queryFn: () => getSearchCity({ uf }),
    enabled: !!uf,
  })

  return (
    <FormField
      control={control}
      name={controlName}
      render={({ field }) => (
        <FormItem className="flex flex-col mt-auto">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger
              disabled={disabled}
              className="disabled:hover:bg-transparent"
              asChild
            >
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
                    ? citys?.find((city) => city.nome === field.value)?.nome
                    : 'Selecione a cidade'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-full sm:w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Informe a cidade" />
                <CommandList>
                  <CommandEmpty>Cidade não encontrada</CommandEmpty>
                  <ScrollArea className="w-full  rounded-md border">
                    <CommandGroup>
                      {isLoading && <CommandItem>Carregando</CommandItem>}
                      {citys &&
                        citys.map((city) => (
                          <CommandItem
                            key={city.id}
                            value={city.nome ?? ''}
                            onSelect={() => {
                              setValue('cidade', city.nome ?? '')
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                city.nome === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {city.nome}
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
