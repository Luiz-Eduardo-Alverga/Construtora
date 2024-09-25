import { api } from '@/lib/axios'

interface GetStatesResponse {
  id: number
  sigla: string
  nome: string
  regiao: {
    id: number
    sigla: string
    nome: string
  }
}

export async function getSearchStates() {
  const response = await api.get<GetStatesResponse[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
  )

  return response.data
}
