import { api } from '@/lib/axios'

interface getEnterpriseResponse {
  id: 'number'
  razaoSocial: 'string'
  nomeFantasia: 'string'
  cep: 'string'
  cnpj: 'string'
  inscricaoEstadual: 'null | string'
  telefone1: 'string'
  telefone2: 'string'
  cidade: 'string'
  endereco: 'string'
  uf: 'string'
  numero: 'number'
  bairro: 'string'
  email: 'null | string'
  desativada: 'number'
}

export async function getEnterprise(): Promise<getEnterpriseResponse> {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('target')
  const user = localStorage.getItem('user')

  const response = await api.get('Empresa/Info', {
    params: {
      target,
      user,
    },
    headers: {
      Authorization: token,
    },
  })

  return response.data
}
