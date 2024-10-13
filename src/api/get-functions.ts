import { api } from '@/lib/axios'

interface GetFunctionsResponse {
  data: {
    id: number
    nome: string
  }[]
}

export async function getEmployeeFunctions(): Promise<GetFunctionsResponse> {
  const target = localStorage.getItem('target')
  const token = localStorage.getItem('authToken')

  const response = await api.get('/Funcoes/Listar', {
    params: {
      target,
    },
    headers: {
      Authorization: token,
    },
  })

  return response.data
}
