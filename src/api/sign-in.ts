import { api } from '@/lib/axios'

export interface SignInBody {
  username: string
  password: string
}

export async function signIn({ username, password }: SignInBody) {
  const response = await api.post(
    'ngpflj9til.execute-api.sa-east-1.amazonaws.com/Login',
    { username, password },
  )

  if (response.data.statusCode === 401) {
    throw new Error()
  }

  const responseBody = JSON.parse(response.data.body)

  const token = responseBody.token
  const target = responseBody.target

  document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60};`
  document.cookie = `crf=${target}`

  console.log(response)

  return response.data
}
