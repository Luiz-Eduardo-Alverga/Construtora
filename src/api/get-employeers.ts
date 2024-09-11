import { api } from '@/lib/axios'
import { getCookieValue } from '@/utils/get-cookie.value'

export interface Employeers {
  id: number | null
  Nome: string | null
}

export async function getEmplooyers(): Promise<Employeers[]> {
  const token = getCookieValue('token')
  const crf = getCookieValue('crf')

  const response = await api.get('/Funcionarios', {
    params: {
      target: crf,
    },
    headers: {
      Authorization: token,
    },
  })

  return JSON.parse(response.data.body)
}