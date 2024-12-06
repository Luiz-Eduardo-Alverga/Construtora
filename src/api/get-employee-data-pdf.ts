import { api } from '@/lib/axios'

interface EmployeePointsPdfResponse {
  empresa: {
    data: {
      razao: string
      fantasia: string
      cep: string
      cnpj: string
      cidade: string
      bairro: string
      numero: string
      endereco: string
      uf: string
    }
  }
  funcionario: {
    data: {
      funcao: string
      cpf: string
      nome: string
    }
  }
}

interface EmployeePointsPdfParams {
  id: number | undefined
}

export async function getEmployeePointsPdf({
  id,
}: EmployeePointsPdfParams): Promise<EmployeePointsPdfResponse> {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('target')
  const user = localStorage.getItem('user')

  const response = await api.get('Relatorio/Ponto', {
    params: {
      target,
      user,
      id,
    },
    headers: {
      Authorization: token,
    },
  })

  return response.data
}
