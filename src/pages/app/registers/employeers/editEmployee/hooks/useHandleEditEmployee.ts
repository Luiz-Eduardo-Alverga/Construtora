import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { editEmployee, EditEmployeeBody } from '@/api/employee/edit-employee'
import { GetEmployeeResponse } from '@/api/employee/get-employee'

import { EditEmployeeSchema } from '../edit-employee-form'
import { formatDateFields } from '../functions/format-date-fields'
import { getChangedFields } from '../functions/get-change-fields'
import { validateNotNullableFields } from '../functions/validate-not-nullable-fields'

export function useHandleEditEmployee(
  employeers: GetEmployeeResponse | undefined,
  selectedDates: {
    selectedDateBirth: Date | undefined
    selectedDateResignation: Date | undefined
    selectedDateAdmission: Date | undefined
  },
  id: string | undefined,
) {
  const navigate = useNavigate()

  const { mutateAsync: editEmployeeSelected } = useMutation({
    mutationFn: (data: EditEmployeeBody) => editEmployee(data),
  })

  return async function handleEditEmployee(data: EditEmployeeSchema) {
    const isValid = validateNotNullableFields({
      nome: data.nome,
      funcao: data.funcao,
    })
    if (!isValid) return

    const { dataAdmissao, dataDemissao, dataNascimento } =
      formatDateFields(selectedDates)

    if (employeers?.data[0]) {
      const employeeFromApi = employeers.data[0]
      const changedFields = getChangedFields(
        data,
        employeeFromApi,
        dataAdmissao,
        dataDemissao,
        dataNascimento,
      )

      try {
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
}
