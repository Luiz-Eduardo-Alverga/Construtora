import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

export interface SignInBody {
  username: string
  password: string
}

export async function signIn({ username, password }: SignInBody) {
  try {
    const response = await api.post('/Login', { username, password })

    const target = response.data.target
    const token = response.data.token

    localStorage.setItem('authToken', token)
    localStorage.setItem('authTarget', target)

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro desconhecido')
    }

    throw new Error('Ocorreu um erro inesperado.')
  }
}
