import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDateStore } from '@/zustand/useSelectedDatesStore'
import { useForm } from 'react-hook-form'
import { addMinutes, parseISO } from 'date-fns'
import { fieldsMapping } from '../FieldsForm/fields-mapping'
import { useQuery } from '@tanstack/react-query'
import { getEmployee } from '@/api/employee/get-employee'

export function useEditEmployeeForm(editEmployeeForm: ReturnType<typeof useForm>) {
  const { id } = useParams()
  const location = useLocation()

  const {
    setSelectedDateAdmission,
    setSelectedDateBirth,
    setSelectedDateResignation,
    clearDates,
  } = useDateStore()

  const { data: employeers, isLoading } = useQuery({
    queryKey: ['EmployeeDetails', id],
    queryFn: () => getEmployee({ id }),
  })

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

  return { employeers, isLoading }
}
