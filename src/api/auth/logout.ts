// import { api } from '@/lib/axios'

export async function logout() {
  // const token = localStorage.getItem('authToken')

  // const response = await api.post('User/Logout', { token })

  localStorage.removeItem('authToken')
  localStorage.removeItem('target')

  // return response.data
}
