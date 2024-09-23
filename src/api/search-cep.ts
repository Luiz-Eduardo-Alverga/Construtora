import { api } from '@/lib/axios'

interface SearchCepQuery {
  cep: string
}

interface CepResponse {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export async function getSearchCep({
  cep,
}: SearchCepQuery): Promise<CepResponse | null> {
  try {
    const response = await api.get<CepResponse>(
      `https://viacep.com.br/ws/${cep}/json/`,
    )
    const data = response.data

    // Se o CEP não for encontrado, a API retorna um erro no formato:
    // { "erro": true }
    if ('erro' in data) {
      throw new Error('CEP não encontrado')
    }

    return data
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    return null // Retorna null em caso de erro
  }
}
