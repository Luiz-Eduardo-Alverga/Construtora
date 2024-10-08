import { api } from '@/lib/axios'

export interface Employeers {
  id: number | null
  Nome: string | null
}

export async function getEmplooyers(): Promise<Employeers[]> {
  const target = localStorage.getItem('authTarget')
  const token = localStorage.getItem('authToken')

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
