import { api } from '@/lib/axios'

export interface SignInBody {
  username: string
  password: string
}

export async function signIn({ username, password }: SignInBody) {
  const response = await api.post('/Login', { username, password })

  const target = response.data.target
  const token = response.data.token

  document.cookie = `crf=${target}`
  document.cookie = `token=${token}`

  return response.data
}
