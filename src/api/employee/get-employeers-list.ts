import { api } from '@/lib/axios'

interface GetEmployeersListQuery {
  codigoFuncionario?: string | null
  nome?: string | null
  cpf?: string | null
  page?: number | null
  limit?: number | null
  funcao?: string | null
}

interface GetEmployeersListResponse {
  data: {
    nome: string | null
    cpf: string | null
    funcao: string | null
    cod: string | null
  }[]
  totalPages: number | null
  totalRecords: number | null
  currentPage: string | null
  pageSize: string | null
}

export async function getEmployeersList({
  nome,
  codigoFuncionario,
  cpf,
  limit,
  page,
  funcao,
}: GetEmployeersListQuery): Promise<GetEmployeersListResponse> {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('target')
  const user = localStorage.getItem('user')

  const response = await api.get('Funcionarios/Filtrar', {
    params: {
      nome,
      codigoFuncionario,
      cpf,
      page,
      limit,
      target,
      user,
      funcao,
    },
    headers: {
      Authorization: token,
    },
  })

  return response.data
}
