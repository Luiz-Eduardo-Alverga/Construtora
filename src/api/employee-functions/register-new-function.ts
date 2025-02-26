import { api } from '@/lib/axios'

interface RegisterNewFunctionReponse {
  funcao: string
  descricao: string
  horasSemanais: string
  diasJornada: Record<string, boolean>
}

export async function registerNewFunction({
  descricao,
  diasJornada,
  funcao,
  horasSemanais,
}: RegisterNewFunctionReponse) {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('target')
  const user = localStorage.getItem('user')

  const response = await api.post(
    '/Funcoes/Inserir',
    {
      funcao,
      descricao,
      diasJornada,
      horasSemanais,
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
