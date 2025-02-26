import { diasDaSemana } from '../../../employeeFunctions/register/register-functions-dialog'
import { EditEmployeeSchema } from '../edit-employee-form'
import { Employee, fieldsMapping } from '../form/fieldsForm/fields-mapping'

export function getChangedFields(
  data: EditEmployeeSchema,
  employeeFromApi: Employee,
  dataAdmissao: string,
  dataDemissao: string,
  dataNascimento: string,
) {
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

  const diasSelecionados = data.daysOfWeek

  const diasJornada = diasDaSemana.reduce<Record<string, boolean>>(
    (acc, dia) => {
      acc[dia] = diasSelecionados.includes(dia)
      return acc
    },
    {},
  )

  if (dataAdmissao !== employeeFromApi.dataAdmissao) {
    changedFields.dataAdmissao = dataAdmissao
  }

  if (dataDemissao !== employeeFromApi.dataDemissao) {
    changedFields.dataDemissao = dataDemissao
  }

  if (dataNascimento !== employeeFromApi.dataNascimento) {
    changedFields.dataNascimento = dataNascimento
  }

  if (data.funcao !== employeeFromApi.funcao) {
    changedFields.funcao = data.funcao
  }

  changedFields.diasJornada = diasJornada

  return changedFields
}
