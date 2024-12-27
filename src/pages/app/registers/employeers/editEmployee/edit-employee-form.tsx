import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { addMinutes, formatDate, parseISO } from 'date-fns'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { editEmployee, EditEmployeeBody } from '@/api/employee/edit-employee'
import { getEmployee } from '@/api/employee/get-employee'
import { Separator } from '@/components/ui/separator'
import { useDateStore } from '@/zustand/useSelectedDatesStore'

import {
  editEmployeeSchema,
  fieldsMapping,
} from './Form/FieldsForm/fields-mapping'
import { FormActions } from './Form/form-actions'
import { FormHeaderFirstLine } from './Form/FormLayout/form-first-line'
import { FormHeader } from './Form/FormLayout/form-header'
import { FormSecondLine } from './Form/FormLayout/Form-second-line'
import { FormTabs } from './Form/FormTabs/form-tabs'
import { RegisterEmployeeFormSkeleton } from './skeleton/register-employee-form-skeleton'

export type EditEmployeeSchema = z.infer<typeof editEmployeeSchema>

export function RegisterEmployeeForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const editEmployeeForm = useForm<EditEmployeeSchema>({
    resolver: zodResolver(editEmployeeSchema),
  })

  const {
    selectedDateBirth,
    selectedDateResignation,
    setSelectedDateBirth,
    setSelectedDateResignation,
    clearDates,
    selectedDateAdmission,
    setSelectedDateAdmission,
  } = useDateStore()

  const { data: employeers, isLoading } = useQuery({
    queryKey: ['EmployeeDetails', id],
    queryFn: () => getEmployee({ id }),
  })

  const { mutateAsync: editEmployeeSelected } = useMutation({
    mutationFn: (data: EditEmployeeBody) => editEmployee(data),
  })

  async function handleEditEmployee(data: EditEmployeeSchema) {
    const formatedDateAdmission = selectedDateAdmission
      ? formatDate(selectedDateAdmission, 'yyyy-MM-dd')
      : ''

    const formatedDateBirth = selectedDateBirth
      ? formatDate(selectedDateBirth, 'yyyy-MM-dd')
      : ''

    const formatedDateResignation = selectedDateResignation
      ? formatDate(selectedDateResignation, 'yyyy-MM-dd')
      : ''

    data.dataAdmissao = formatedDateAdmission
    data.dataDemissao = formatedDateResignation
    data.dataNascimento = formatedDateBirth

    if (employeers?.data[0]) {
      const employeeFromApi = employeers.data[0]

      const changedFields = fieldsMapping.reduce<Record<string, unknown>>(
        (acc, { formField, employeeField }) => {
          const formValue = data[formField]
          const apiValue = employeeFromApi[employeeField]

          if (formValue !== apiValue) {
            acc[formField] = formValue
          }

          return acc
        },
        {},
      )

      if (data.dataAdmissao !== employeeFromApi.dataAdmissao) {
        changedFields.dataAdmissao = data.dataAdmissao
      }

      if (data.dataDemissao !== employeeFromApi.dataDemissao) {
        changedFields.dataDemissao = data.dataDemissao
      }

      if (data.dataNascimento !== employeeFromApi.dataNascimento) {
        changedFields.dataNascimento = data.dataNascimento
      }

      if (data.funcao !== employeeFromApi.funcao) {
        changedFields.funcao = data.funcao
      }

      try {
        console.log('dados formulario', changedFields)
        await editEmployeeSelected({
          id,
          dadosFuncionario: changedFields,
        })
        navigate(-1)
        toast.success('Funcionário atualizado com sucesso!')
      } catch (error) {
        toast.error('Erro ao atualizar funcionário')
      }
    }
  }

  useEffect(() => {
    const isEditEmployeeRoute = /^\/cadastros\/funcionarios\/\d+\/editar$/.test(
      location.pathname,
    )

    if (isEditEmployeeRoute) {
      clearDates()
    }
    const { setValue } = editEmployeeForm

    employeers?.data.forEach((employee) => {
      fieldsMapping.forEach(({ formField, employeeField }) => {
        const value = employee[employeeField] ?? ''
        setValue(formField, value)
      })
    })

    if (employeers) {
      const employee = employeers.data[0]
      if (employee.dataAdmissao) {
        const localDate = addMinutes(
          parseISO(employee.dataAdmissao),
          new Date().getTimezoneOffset(),
        )
        setSelectedDateAdmission(localDate)
      }

      if (employee.dataNascimento) {
        const localDate = addMinutes(
          parseISO(employee.dataNascimento),
          new Date().getTimezoneOffset(),
        )
        setSelectedDateBirth(localDate)
      }

      if (employee.dataDemissao) {
        const localDate = addMinutes(
          parseISO(employee.dataDemissao),
          new Date().getTimezoneOffset(),
        )
        setSelectedDateResignation(localDate)
      }
    }
  }, [
    editEmployeeForm,
    employeers,
    employeers?.data,
    location,
    clearDates,
    setSelectedDateResignation,
    setSelectedDateBirth,
    setSelectedDateAdmission,
  ])

  return (
    <div>
      {isLoading && <RegisterEmployeeFormSkeleton />}
      <FormProvider {...editEmployeeForm}>
        <form onSubmit={editEmployeeForm.handleSubmit(handleEditEmployee)}>
          {employeers &&
            employeers?.data.map((employee) => (
              <div key={employee.id}>
                <FormHeader employeeName={employee.nome} />

                <div className="mx-4 space-y-6 ">
                  <FormHeaderFirstLine />

                  <Separator />

                  <FormSecondLine employeeFunction={employee.funcao} />

                  <Separator />

                  <FormTabs />

                  <Separator />

                  <FormActions
                    onCancel={() => navigate(-1)}
                    cancelLabel="Cancelar"
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
