import { api } from '@/lib/axios'

interface GetFunctionsResponse {
  data: {
    id: number
    Nome: string
  }[]
}

export async function getEmployeeFunctions(): Promise<GetFunctionsResponse> {
  const target = localStorage.getItem('authTarget')
  const token = localStorage.getItem('authToken')

  const response = await api.get('Funcoes', {
    params: {
      target,
    },
    headers: {
      Authorization: token,
    },
  })

  return JSON.parse(response.data.body)
}
