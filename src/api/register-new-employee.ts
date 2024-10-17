import { api } from '@/lib/axios'

interface RegisterNewEmployeeBody {
  nome: string
  Funcao: number
}

export async function registerNewEmployee({
  nome,
  Funcao,
}: RegisterNewEmployeeBody) {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('target')

  const response = await api.post(
    '/Funcionarios/Cadastrar',
    {
      nome,
      Funcao,
      target,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  )

  return response.data
}
