import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

export interface SignInBody {
  user: string
  pwd: string
}

export async function signIn({ user, pwd }: SignInBody) {
  try {
    const response = await api.post('/User/Login', { user, pwd })

    const token = response.data.idtoken

    localStorage.setItem('authToken', token)

    document.cookie = `token=${token}; max-age=${60 * 60}`

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro desconhecido')
    }

    throw new Error('Ocorreu um erro inesperado.')
  }
}
