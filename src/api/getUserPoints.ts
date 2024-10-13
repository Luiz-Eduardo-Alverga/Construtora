import { api } from '@/lib/axios'

export interface GetEmployeeQuery {
  EmployeeId?: number | null
  DataInicio?: string | null
  DataFim?: string | null
}

export interface EmployeePointsResponse {
  data: {
    Data: string
    HoraInicio: string | null
    HoraAlmoco: string | null
    HoraRetorno: string | null
    HoraFim: string | null
  }[]
}

export async function getEmployeePoints({
  EmployeeId,
  DataInicio,
  DataFim,
}: GetEmployeeQuery): Promise<EmployeePointsResponse> {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('target')

  const response = await api.get('/Ponto/Buscar', {
    params: {
      DataInicio,
      DataFim,
      target,
      EmployeeId,
    },
    headers: {
      authorization: token,
    },
  })

  return response.data
}
