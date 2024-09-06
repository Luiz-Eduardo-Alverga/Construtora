import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getEmployeePoints } from '@/api/getUserPoints'

import { EmployeePontFilters } from './employee-point-filters'
import { EmployeePointsHeader } from './employee-points-header'
import { EmployeePointsTable } from './employee-points-table'

export function EmployeePoints() {
  const [searchParams] = useSearchParams()

  const employeeId = searchParams.get('employeeId')
  const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined
  const dataInicio = searchParams.get('dataInicio')
  const dataFim = searchParams.get('dataFim')

  const { data: results = [] } = useQuery({
    queryKey: ['employee', parsedEmployeeId, dataInicio, dataFim],
    queryFn: () =>
      getEmployeePoints({
        Employeeid: parsedEmployeeId,
        DataInicio: dataInicio,
        DataFim: dataFim,
      }),
  })

  return (
    <div className="m-2 pt-4 space-y-10">
      <EmployeePointsHeader />
      <EmployeePontFilters />
      <EmployeePointsTable results={results} />
    </div>
  )
}
