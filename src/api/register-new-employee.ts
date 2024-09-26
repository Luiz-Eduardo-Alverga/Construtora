import { api } from '@/lib/axios'
import { getCookieValue } from '@/utils/get-cookie.value'

interface RegisterNewEmployeeBody {
  nome: string
  funcao: number
}

export async function registerNewEmployee({
  nome,
  funcao,
}: RegisterNewEmployeeBody) {
  const token = getCookieValue('token')
  const crf = getCookieValue('crf')

  const response = await api.post(
    '/Funcionarios/Cadastrar',
    {
      nome,
      funcao,
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
