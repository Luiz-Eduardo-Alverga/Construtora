import { api } from '@/lib/axios'

interface GetUserEnterprisesQuery {
  user: string
}

interface GetUserEnterprisesResponse {
  data: {
    empresa: string
    idEmpresa: number
    secret: string
    target: string
    user: string
  }[]
}

export async function getUserEnterprises({
  user,
}: GetUserEnterprisesQuery): Promise<GetUserEnterprisesResponse> {
  const response = await api.get('/User/Empresa', {
    params: {
      user,
    },
  })

  return response.data
}
