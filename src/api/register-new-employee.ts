import { api } from '@/lib/axios'
import { getCookieValue } from '@/utils/get-cookie.value'

interface RegisterNewEmployeeBody {
  nome: string
}

export async function registerNewEmployee({ nome }: RegisterNewEmployeeBody) {
  const token = getCookieValue('token')
  const crf = getCookieValue('crf')

  const response = await api.post(
    '/Funcionarios/Cadastrar',
    {
      nome,
      target: crf,
      Authorization: token,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  )

  return response.data
}
