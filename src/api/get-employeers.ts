import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

export interface Employeers {
  data: {
    id: number | null
    nome: string | null
  }[]
}

export async function getEmplooyers(): Promise<Employeers> {
  try {
    const target = localStorage.getItem('target')
    const token = localStorage.getItem('authToken')

    const response = await api.get('/Funcionarios/Listar', {
      params: {
        target,
      },
      headers: {
        Authorization: token,
      },
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro desconhecido')
    }

    throw new Error('Ocorreu um erro inesperado.')
  }
}
