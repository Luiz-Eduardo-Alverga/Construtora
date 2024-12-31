import { api } from '@/lib/axios'

interface GetFunctionParams {
  id?: string
}

interface GetFunctionResponse {
  data: {
    id: number
    funcao: string
    descricao?: string
    horasSemanais?: string
    diasJornada?:
      | string // Caso ainda não tenha sido parseado
      | {
          segunda: boolean
          terca: boolean
          quarta: boolean
          quinta: boolean
          sexta: boolean
          sabado: boolean
          domingo: boolean
        }
  }
}

export async function getFunction({
  id,
}: GetFunctionParams): Promise<GetFunctionResponse> {
  const target = localStorage.getItem('target')
  const token = localStorage.getItem('authToken')
  const user = localStorage.getItem('user')

  const response = await api.get('Funcoes/Info', {
    params: {
      target,
      user,
      id,
    },
    headers: {
      Authorization: token,
    },
  })

  return response.data
}
