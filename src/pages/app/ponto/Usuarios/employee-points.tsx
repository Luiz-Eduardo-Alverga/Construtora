import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getEmplooyers } from '@/api/get-employeers'
import { getEmployeePoints } from '@/api/getUserPoints'
import { Pagination } from '@/components/pagination'

import { EmployeePontFilters } from './employee-point-filters'
import { EmployeePointsHeader } from './employee-points-header'
import { EmployeePointsTable } from './employee-points-table'

export function EmployeePoints() {
  const [searchParams, setSearchParams] = useSearchParams()

  const employeeId = searchParams.get('employeeId')
  const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined
  const dataInicio = searchParams.get('dataInicio')
  const dataFim = searchParams.get('dataFim')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page)
    .parse(searchParams.get('page') ?? '1')

  const { data: employeers } = useQuery({
    queryKey: ['Employeers'],
    queryFn: getEmplooyers,
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString())

      return prev
    })
  }
  const limit = 10

  const { data: results } = useQuery({
    queryKey: [
      'employeePoints',
      parsedEmployeeId,
      dataInicio,
      dataFim,
      pageIndex,
      limit,
    ],
    queryFn: () =>
      getEmployeePoints({
        employeeId: parsedEmployeeId,
        DataInicio: dataInicio,
        DataFim: dataFim,
        page: pageIndex,
        limit,
      }),
  })

  console.log(results)

  return (
    <div className="m-2 pt-4 space-y-6">
      <EmployeePointsHeader />
      <EmployeePontFilters employeers={employeers ?? []} />
      <EmployeePointsTable results={results?.data ?? []} />

      {results?.pages && (
        <Pagination
          onPageChange={handlePaginate}
          pageIndex={pageIndex}
          pages={results.pages ?? 0}
        />
      )}
    </div>
  )
}
