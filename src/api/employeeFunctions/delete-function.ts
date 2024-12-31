import { api } from '@/lib/axios'

interface deleteFunctionRequest {
  id: number | undefined
}

export async function deleteFunction({ id }: deleteFunctionRequest) {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('target')
  const user = localStorage.getItem('user')

  const response = await api.delete(`Funcoes/Excluir`, {
    data: {
      target,
      user,
      id,
    },
    headers: {
      Authorization: token,
    },
  })

  return response.data
}
