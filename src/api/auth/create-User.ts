import { api } from '@/lib/axios'

interface CreateUserBody {
  user: string
  pwd: string
}

export async function createUser({ user, pwd }: CreateUserBody) {
  const target = '2Docs'
  const userDB = 'Kilberty'

  const response = await api.post('User/Add', {
    user,
    pwd,
    target,
    userDB,
  })

  return response.data
}
