import { useQuery } from '@tanstack/react-query'
import { FileClock, Loader } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { getEmplooyers } from '@/api/get-employeers'
import { getEmployeePoints } from '@/api/getUserPoints'
import searchInfo from '@/assets/searcrInfo.svg'
import { HeaderPages } from '@/components/header-pages'
import { NoDataLayout } from '@/components/no-date-layout'
import { columns } from '@/pages/app/ponto/Usuarios/EmployeePointsTable/colums'

import { AdjustEmployeePoints } from './AdjustUserPoints/adjust-user-points-drawer'
import { EmployeePontFilters } from './employee-point-filters'
import { DataTable } from './EmployeePointsTable/data-table'

export function EmployeePoints() {
  const [searchParams] = useSearchParams()

  const employeeId = searchParams.get('employeeId')
  const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined
  const dateFom = searchParams.get('dataInicio')
  const dateTo = searchParams.get('dataFim')

  const { data: employeers, isLoading } = useQuery({
    queryKey: ['Employeers'],
    queryFn: getEmplooyers,
  })

  const { data: results, isLoading: isLoadingResults } = useQuery({
    queryKey: ['employeePoints', parsedEmployeeId, dateFom, dateTo],
    queryFn: () =>
      getEmployeePoints({
        EmployeeId: parsedEmployeeId,
        DataInicio: dateFom,
        DataFim: dateTo,
      }),

    enabled: !!employeeId && !!dateFom,
  })

  return (
    <div className="m-2 pt-4 space-y-6">
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
        <AdjustEmployeePoints />
      </div>
      <div>
        {isLoadingResults ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-500 bg-opacity-50 z-50">
            <Loader className="w-10 h-10 text-violet-500 animate-spin" />
          </div>
        ) : results ? (
          <DataTable columns={columns} data={results.data} />
        ) : (
          <NoDataLayout image={searchInfo} />
        )}
      </div>
    </div>
  )
}
