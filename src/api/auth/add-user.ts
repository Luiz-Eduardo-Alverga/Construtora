import { api } from '@/lib/axios'

interface AddUserProps {
  user: string
  nomeEmpresa: string | null
  desativado: number
}

export async function addUserFn({
  desativado,
  nomeEmpresa,
  user,
}: AddUserProps) {
  const target = localStorage.getItem('target')
  const dbUser = localStorage.getItem('user')
  const empresaID = Number(localStorage.getItem('enterpriseId'))

  const response = await api.post('User/Email', {
    desativado,
    empresaID,
    nomeEmpresa,
    user,
    target,
    db_user: dbUser,
  })

  return response.data
}
