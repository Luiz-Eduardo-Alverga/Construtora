import { api } from '@/lib/axios'

export interface GetEmployeeQuery {
  Employeeid?: number | null
  DataInicio?: string | null
  DataFim?: string | null
}

export interface EmployeePoints {
  Data: string
  HoraInicio: string | null
  HoraAlmoco: string | null
  HoraRetorno: string | null
  HoraFim: string | null
}

function getCookieValue(name: string): string | undefined {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) {
    return match[2]
  }
  return undefined
}

export async function getEmployeePoints({
  Employeeid,
  DataInicio,
  DataFim,
}: GetEmployeeQuery): Promise<EmployeePoints[]> {
  const token = getCookieValue('token')
  const crf = getCookieValue('crf')

  const response = await api.get(
    'https://c9bl4gbqjd.execute-api.sa-east-1.amazonaws.com/BuscaPonto',
    {
      params: {
        Employeeid,
        DataFim,
        DataInicio,
        target: crf,
      },
      headers: {
        authorization: token,
      },
    },
  )

  return JSON.parse(response.data.body)
}
