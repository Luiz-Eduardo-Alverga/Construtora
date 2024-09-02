import { api } from '@/lib/axios'

export interface GetEmployeeBody {
  id: string
  dataInicio: string
  dataFim: string
}

export async function getEmployeePoints({
  id,
  dataInicio,
  dataFim,
}: GetEmployeeBody) {
  const response = await api.post('/ponto/buscaPonto', {
    id,
    dataInicio,
    dataFim,
  })

  return response.data
}
