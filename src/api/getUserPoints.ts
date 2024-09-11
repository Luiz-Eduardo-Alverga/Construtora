import { api } from '@/lib/axios'
import { getCookieValue } from '@/utils/get-cookie.value'

export interface GetEmployeeQuery {
  employeeId?: number | null
  DataInicio?: string | null
  DataFim?: string | null
  page?: number | null
  limit?: number | null
}

export interface EmployeePoints {
  data: {
    Data: string
    HoraInicio: string | null
    HoraAlmoco: string | null
    HoraRetorno: string | null
    HoraFim: string | null
  }[]
  pages: number | null
}

export async function getEmployeePoints({
  employeeId,
  DataInicio,
  DataFim,
  page,
  limit,
}: GetEmployeeQuery): Promise<EmployeePoints> {
  const token = getCookieValue('token')
  const crf = getCookieValue('crf')

  const response = await api.get('/buscaPonto', {
    params: {
      DataInicio,
      DataFim,
      page,
      target: crf,
      limit,
      employeeId,
    },
    headers: {
      authorization: token,
    },
  })

  return JSON.parse(response.data.body)
}
