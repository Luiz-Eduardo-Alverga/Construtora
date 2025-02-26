import { api } from '@/lib/axios'

interface AdjustPointsBody {
  idFuncionario: number
  idOperacao: number
  justificativa: string
  datas: string[]
}

export async function AdjustPoints({
  datas,
  idFuncionario,
  idOperacao,
  justificativa,
}: AdjustPointsBody) {
  const target = localStorage.getItem('target')
  const token = localStorage.getItem('authToken')
  const user = localStorage.getItem('user')

  const response = await api.post(
    'Ponto/AjustarDia',
    {
      datas,
      idFuncionario,
      idOperacao,
      justificativa,
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
