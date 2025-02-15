import { Controller, useFormContext } from 'react-hook-form'

import { SelectEmployeeFunctions } from '@/components/employee-function'
import { Label } from '@/components/ui/label'
import { useDateStore } from '@/zustand/useSelectedDatesStore'

import { CalendarSingleDatePicker } from '../../../../../../../components/calendar/calendar-picker-single'
import { FormCheckbox } from '../form-checkbox'
import { InputForm } from '../input-form'
import { FormContainer } from './form-container'

interface FormSecondLineProps {
  employeeFunction: number | null
}

export function FormSecondLine({ employeeFunction }: FormSecondLineProps) {
  const { control } = useFormContext()

  const { selectedDateAdmission, setSelectedDateAdmission } = useDateStore()

  return (
    <FormContainer>
      <SelectEmployeeFunctions
        controlName="funcao"
        space="sm:w-64"
        defaultValue={employeeFunction}
      />

      <div className="space-y-0.5 flex-1 relative">
        <Label>Data Admissão</Label>
        <Controller
          name="dataAdmissao"
          control={control}
          render={({ field }) => (
            <CalendarSingleDatePicker
              date={selectedDateAdmission}
              setDate={setSelectedDateAdmission}
              {...field}
            />
          )}
        />
      </div>

      <InputForm label="PIS" registerName="pis" id="pis" allspace="flex-1" />

      <FormCheckbox />
    </FormContainer>
  )
}
