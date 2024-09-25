import { api } from '@/lib/axios'
import { getCookieValue } from '@/utils/get-cookie.value'

export interface Employeers {
  id: number | null
  Nome: string | null
}

export async function getEmplooyers(): Promise<Employeers[]> {
  const target = getCookieValue('crf')
  const token = getCookieValue('token')

  const response = await api.get('/Funcionarios', {
    params: {
      target,
    },
    headers: {
      Authorization: token,
    },
  })

  return JSON.parse(response.data.body)
}
