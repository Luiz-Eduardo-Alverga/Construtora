import { api } from '@/lib/axios'

export interface EditEmployeeBody {
  id: string | undefined
  dadosFuncionario?: {
    id?: string | null
    nome?: string | null
    codigo?: string | null
    dataAdmissao?: string | null
    dataDemissao?: string | null
    endereco?: string | null
    cep?: string | null
    bairro?: string | null
    numeroEndereco?: string | null
    cidade?: string | null
    uf?: string | null
    emissaoRG?: string | null
    complemento?: string | null
    cpf?: string | null
    esocial?: string | null
    rg?: string | null
    orgaoEmissor?: string | null
    ufRg?: string | null
    dataEmissaoRg?: string | null
    pisPasep?: string | null
    ctps?: string | null
    serieCtps?: string | null
    nomePai?: string | null
    nomeMae?: string | null
    ufNasc?: string | null
    cidadeNasc?: string | null
    funcao?: number | null
    dataNascimento?: string | null
    diasJornada?: Record<string, boolean>
    horas?: number | null
  }
}

export async function editEmployee({ dadosFuncionario, id }: EditEmployeeBody) {
  const token = localStorage.getItem('authToken')
  const target = localStorage.getItem('target')
  const user = localStorage.getItem('user')

  const response = await api.patch(
    `Funcionarios/${id}/editar`,
    {
      target,
      user,
      dadosFuncionario,
    },
    {
      headers: {
        Authorization: token,
      },
    },
  )

  return response.data
}
