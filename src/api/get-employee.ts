import { api } from '@/lib/axios'
import { getCookieValue } from '@/utils/get-cookie.value'

interface GetEmployeeDetails {
  id: string | undefined
}

interface GetEmployeeResponse {
  id: string | null
  Nome: string | null
}

export async function getEmployee({
  id,
}: GetEmployeeDetails): Promise<GetEmployeeResponse[]> {
  const token = getCookieValue('token')
  const target = getCookieValue('crf')

  const response = await api.get(`Funcionarios/${id}`, {
    params: {
      target,
    },
    headers: {
      Authorization: token,
    },
  })

  return JSON.parse(response.data.body)
}
