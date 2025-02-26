import { api } from '@/lib/axios'

interface GetEmployeeDetails {
  id: string | undefined
}

export interface GetEmployeeResponse {
  data: {
    id: string | null
    nome: string | null
    codigo: string | null
    dataAdmissao: string | null
    dataDemissao: string | null
    endereco: string | null
    cep: string | null
    bairro: string | null
    numeroEndereco: string | null
    cidade: string | null
    uf: string | null
    emissaoRG: string | null
    complemento: string | null
    cpf: string | null
    esocial: string | null
    rg: string | null
    orgaoEmissor: string | null
    ufRg: string | null
    dataEmissaoRg: string | null
    pisPasep: string | null
    ctps: string | null
    serieCtps: string | null
    nomePai: string | null
    nomeMae: string | null
    ufNasc: string | null
    nascimentoMunicipio: string | null
    funcao: number | null
    dataNascimento: string | null
    diasJornada: Record<string, boolean>
    horas: number | null
  }[]
}

export async function getEmployee({
  id,
}: GetEmployeeDetails): Promise<GetEmployeeResponse> {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('target')
  const user = localStorage.getItem('user')

  const response = await api.get(`Funcionarios/${id}/editar`, {
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
