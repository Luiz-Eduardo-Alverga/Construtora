import { api } from '@/lib/axios'

interface RegisterNewEmployeeBody {
  nome: string
  funcao: number
}

export async function registerNewEmployee({
  nome,
  funcao,
}: RegisterNewEmployeeBody) {
  const token = localStorage.getItem('authToken')
  const crf = localStorage.getItem('authTarget')

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
