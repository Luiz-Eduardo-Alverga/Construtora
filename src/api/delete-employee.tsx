import { api } from '@/lib/axios'

interface DeleteEmployeeRequest {
  id: string | undefined
}

export async function deleteEmployee({ id }: DeleteEmployeeRequest) {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('target')

  const response = await api.delete(`Funcionarios/${id}/excluir`, {
    params: {
      target,
    },
    headers: {
      Authorization: token,
    },
  })

  return response.data
}
