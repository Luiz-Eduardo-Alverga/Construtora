import { api } from '@/lib/axios'

interface EditFunctionsBody {
  id: number
  dados: {
    funcao?: string
    descricao?: string
    horas?: string
    diasJornada?: Record<string, boolean>
  }
}

export async function editFunction({ dados, id }: EditFunctionsBody) {
  const target = localStorage.getItem('target')
  const token = localStorage.getItem('authToken')
  const user = localStorage.getItem('user')

  const response = await api.patch(
    'Funcoes/Editar',
    {
      target,
      user,
      dados,
      id,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  )

  return response.data
}
