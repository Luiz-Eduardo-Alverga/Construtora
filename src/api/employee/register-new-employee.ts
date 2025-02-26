import { api } from '@/lib/axios'

interface RegisterNewEmployeeBody {
  dadosfuncionario: {
    nome: string
    funcao: number
    horas: string
    diasJornada: Record<string, boolean>
  }
}

export async function registerNewEmployee({
  dadosfuncionario,
}: RegisterNewEmployeeBody) {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('target')
  const user = localStorage.getItem('user')

  const response = await api.post(
    '/Funcionarios/Cadastrar',
    {
      dadosfuncionario,
      target,
      user,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  )

  return response.data
}
