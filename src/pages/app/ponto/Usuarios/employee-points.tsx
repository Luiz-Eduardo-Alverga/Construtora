import { useQuery } from '@tanstack/react-query'
import { FileClock } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { getEmplooyers } from '@/api/get-employeers'
import { getEmployeePoints } from '@/api/getUserPoints'
import { HeaderPages } from '@/components/header-pages'
import { Pagination } from '@/components/pagination'

import { EmployeePontFilters } from './employee-point-filters'
import { EmployeePointsTable } from './employee-points-table'

export function EmployeePoints() {
  const [searchParams, setSearchParams] = useSearchParams()

  const employeeId = searchParams.get('employeeId')
  const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined
  const dateFom = searchParams.get('dataInicio')
  const dateTo = searchParams.get('dataFim')

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
      dateFom,
      dateTo,
      pageIndex,
      limit,
    ],
    queryFn: () =>
      getEmployeePoints({
        employeeId: parsedEmployeeId,
        DataInicio: dateFom,
        DataFim: dateTo,
        page: pageIndex,
        limit,
      }),
  })

  return (
    <div className="m-2 pt-4 space-y-6">
      <HeaderPages
        title="Listagem de Pontos"
        description="Verifique os registros de pontos do seu funcionário"
        icon={FileClock}
      />
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
