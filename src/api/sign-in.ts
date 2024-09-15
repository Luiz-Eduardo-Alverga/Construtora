import { api } from '@/lib/axios'

export interface SignInBody {
  username: string
  password: string
}

export async function signIn({ username, password }: SignInBody) {
  const response = await api.post('/Login', { username, password })

  if (response.data.statusCode === 401) {
    throw new Error()
  }

  const responseBody = JSON.parse(response.data.body)

  const token = responseBody.token
  const target = responseBody.target

  document.cookie = `token=${token}; path=/; max-age=${60 * 60};`
  document.cookie = `crf=${target}`
  localStorage.setItem('authToken', token)

  return response.data
}
