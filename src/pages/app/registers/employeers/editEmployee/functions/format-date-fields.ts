import { formatDate } from 'date-fns'

export function formatDateFields(selectedDates: {
  selectedDateBirth: Date | undefined
  selectedDateResignation: Date | undefined
  selectedDateAdmission: Date | undefined
}) {
  const { selectedDateBirth, selectedDateResignation, selectedDateAdmission } =
    selectedDates

  const formatedDateAdmission = selectedDateAdmission
    ? formatDate(selectedDateAdmission, 'yyyy-MM-dd')
    : ''

  const formatedDateBirth = selectedDateBirth
    ? formatDate(selectedDateBirth, 'yyyy-MM-dd')
    : ''

  const formatedDateResignation = selectedDateResignation
    ? formatDate(selectedDateResignation, 'yyyy-MM-dd')
    : ''

  return {
    dataAdmissao: formatedDateAdmission,
    dataDemissao: formatedDateResignation,
    dataNascimento: formatedDateBirth,
  }
}
