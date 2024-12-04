import { useQuery } from '@tanstack/react-query'
import { FileClock } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { getEmplooyers } from '@/api/get-employeers'
import { getEmployeePoints } from '@/api/getUserPoints'
import searchInfo from '@/assets/searcrInfo.svg'
import { HeaderPages } from '@/components/header-pages'
import { LoadingRequests } from '@/components/loading/loading'
import { NoDataLayout } from '@/components/no-date-layout'

import { OptionsToEmployeePoints } from './AdjustUserPoints/adjust-user-points-drawer'
import { EmployeePontFilters } from './employee-point-filters'
import { columns } from './EmployeePointsTable/colums'
import { DataTable } from './EmployeePointsTable/data-table'

export function EmployeePoints() {
  const [searchParams] = useSearchParams()

  const employeeId = searchParams.get('employeeId')
  const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined
  const dateFrom = searchParams.get('dataInicio')
  const dateTo = searchParams.get('dataFim')

  const { data: employeers, isLoading } = useQuery({
    queryKey: ['Employeers'],
    queryFn: getEmplooyers,
  })

  const { data: results, isLoading: isLoadingResults } = useQuery({
    queryKey: ['employeePoints', parsedEmployeeId, dateFrom, dateTo],
    queryFn: () =>
      getEmployeePoints({
        EmployeeId: parsedEmployeeId,
        DataInicio: dateFrom,
        DataFim: dateTo,
      }),

    enabled: !!employeeId && !!dateFrom,
  })

  return (
    <main className="m-2 space-y-4">
      <HeaderPages
        title="Listagem de Pontos"
        description="Verifique os registros de pontos do seu funcionário"
        icon={FileClock}
      />
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <EmployeePontFilters
          employeers={employeers?.data ?? []}
          isLoadingEmployee={isLoading}
        />
        {results && (
          <OptionsToEmployeePoints
            parsedEmployeeId={parsedEmployeeId}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        )}
      </div>
      <div className="pt-2">
        {isLoadingResults ? (
          <LoadingRequests />
        ) : results ? (
          <DataTable columns={columns} data={results.data} />
        ) : (
          <NoDataLayout image={searchInfo} />
        )}
      </div>
    </main>
  )
}
