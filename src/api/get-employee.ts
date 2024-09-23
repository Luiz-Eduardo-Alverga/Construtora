import { api } from '@/lib/axios'
import { getCookieValue } from '@/utils/get-cookie.value'

interface GetEmployeeDetails {
  id: string | undefined
}

interface GetEmployeeResponse {
  id: string | null
  nome: string | null
  Codigo: string | null
  dataAdmissao: string | null
  dataDemissao: string | null
  cep: string | null
  bairro: string | null
  numeroendereco: string | null
  cidade: string | null
  uf: string | null
  complemento: string | null
  cpf: string | null
  esocial: string | null
  rg: string | null
  uf_rg: string | null
  dataEmissao: string | null
  pis: string | null
  ctps: string | null
  serieCTPS: string | null
  nomePai: string | null
  nomeMae: string | null
  ufNasc: string | null
  nascimentoMunicipio: string | null
}

export async function getEmployee({
  id,
}: GetEmployeeDetails): Promise<GetEmployeeResponse[]> {
  const token = getCookieValue('token')
  const target = getCookieValue('crf')

  const response = await api.get(`Funcionarios/${id}`, {
    params: {
      target,
    },
    headers: {
      Authorization: token,
    },
  })

  return JSON.parse(response.data.body)
}
