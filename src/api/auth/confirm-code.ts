import { api } from '@/lib/axios'

interface ConfirmCodeBody {
  user: string
  code: string
}

export async function confirmCode({ code, user }: ConfirmCodeBody) {
  const response = await api.post('User/Validar', {
    code,
    user,
  })

  return response.data
}
