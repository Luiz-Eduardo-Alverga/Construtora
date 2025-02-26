import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import { FormHeader } from '@/components/form/form-header'
import { Separator } from '@/components/ui/separator'
import { useParsedDaysOfWeek } from '@/hooks/useParsedDaysOfWeek'
import { useDateStore } from '@/zustand/useSelectedDatesStore'

import { FormActions } from '../../../../../components/form/form-actions'
import { editEmployeeSchema } from './form/fields-mapping'
import { FormHeaderFirstLine } from './form/formLayout/form-first-line'
import { FormSecondLine } from './form/formLayout/form-second-line'
import { FormTabs } from './form/formTabs/form-tabs'
import { useEditEmployeeForm } from './hooks/use-editEmployee-effect'
import { useHandleEditEmployee } from './hooks/useHandleEditEmployee'
import { RegisterEmployeeFormSkeleton } from './skeleton/register-employee-form-skeleton'

export type EditEmployeeSchema = z.infer<typeof editEmployeeSchema>

export function RegisterEmployeeForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const editEmployeeForm = useForm<EditEmployeeSchema>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      daysOfWeek: [],
    },
  })

  const { selectedDateBirth, selectedDateResignation, selectedDateAdmission } =
    useDateStore()

  const { employeers, isLoading } = useEditEmployeeForm(editEmployeeForm)

  const parsedDaysOfWeek = useParsedDaysOfWeek(employeers?.data[0].diasJornada)

  editEmployeeForm.setValue('daysOfWeek', parsedDaysOfWeek)

  const handleEditEmployee = useHandleEditEmployee(
    employeers,
    {
      selectedDateBirth,
      selectedDateResignation,
      selectedDateAdmission,
    },
    id,
  )

  return (
    <div>
      {isLoading && <RegisterEmployeeFormSkeleton />}
      <FormProvider {...editEmployeeForm}>
        <form onSubmit={editEmployeeForm.handleSubmit(handleEditEmployee)}>
          {employeers &&
            employeers?.data.map((employee) => (
              <div key={employee.id}>
                <FormHeader label={'Funcionário'} name={employee.nome} />

                <div className="mx-4 space-y-6 ">
                  <FormHeaderFirstLine />

                  <Separator />

                  <FormSecondLine employeeFunction={employee.funcao} />

                  <Separator />

                  <FormTabs />

                  <Separator />

                  <FormActions
                    onCancel={() => navigate(-1)}
                    cancelLabel="Voltar"
                    submitLabel="Salvar"
                  />
                </div>
              </div>
            ))}
        </form>
      </FormProvider>
    </div>
  )
}
