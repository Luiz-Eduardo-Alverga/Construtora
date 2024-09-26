import { api } from '@/lib/axios'

interface GetEmployeersListQuery {
  codigoFuncionario?: string | null
  nome?: string | null
  cpf?: string | null
  page?: number | null
  limit?: number | null
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
}: GetEmployeersListQuery): Promise<GetEmployeersListResponse> {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('authTarget')

  const response = await api.get('Funcionarios/Listar', {
    params: {
      nome,
      codigoFuncionario,
      cpf,
      page,
      limit,
      target,
    },
    headers: {
      Authorization: token,
    },
  })

  return JSON.parse(response.data.body)
}
