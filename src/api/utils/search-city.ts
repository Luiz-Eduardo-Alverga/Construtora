import { api } from "@/lib/axios";

interface GetSearchCityParams {
    uf?: string
}

interface GetSearchCityResponse {
    id: number |null
    nome: string | null
}[]

export async function getSearchCity ({uf}: GetSearchCityParams) {
    const response = await api.get<GetSearchCityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)

    return response.data
}