import { useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

const daysOfWeek = [
  {
    id: 'segunda',
    label: 'SEG',
  },
  {
    id: 'terca',
    label: 'TER',
  },
  {
    id: 'quarta',
    label: 'QUA',
  },
  {
    id: 'quinta',
    label: 'QUI',
  },
  {
    id: 'sexta',
    label: 'SEX',
  },
  {
    id: 'sabado',
    label: 'SAB',
  },
  {
    id: 'domingo',
    label: 'DOM',
  },
] as const

export function SelectDaysOfWeek() {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="items"
      render={() => (
        <FormItem className="flex justify-between items-end">
          {daysOfWeek.map((item) => (
            <FormField
              key={item.id}
              control={control}
              name="daysOfWeek"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-col items-center"
                  >
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.id,
                                ),
                              )
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
          ))}
        </FormItem>
      )}
    />
  )
}
