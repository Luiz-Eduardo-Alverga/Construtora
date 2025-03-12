import { api } from '@/lib/axios'

interface GetFunctionsResponse {
  data: {
    id: number
    nome: string
    descricao?: string
    diasJornada?: {
      segunda: boolean
      terca: boolean
      quarta: boolean
      quinta: boolean
      sexta: boolean
      sabado: boolean
      domingo: boolean
    }
  }[]
}

interface GetFunctionsParams {
  funcao?: string
  id?: number
}

export async function getEmployeeFunctions({
  funcao,
  id,
}: GetFunctionsParams): Promise<GetFunctionsResponse> {
  const target = localStorage.getItem('target')
  const token = localStorage.getItem('authToken')
  const user = localStorage.getItem('user')

  const response = await api.get('/Funcoes/Listar', {
    params: {
      target,
      user,
      funcao,
      id,
    },
    headers: {
      Authorization: token,
    },
  })

  return response.data
}
