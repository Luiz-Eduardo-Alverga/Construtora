import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

// Função que verifica se o usuário está autenticado (token presente)
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken')
}

interface PublicRouteProps {
  children: ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  // Se o usuário já estiver autenticado, redireciona para a rota home
  if (isAuthenticated()) {
    return <Navigate to="/app" />
  }

  // Se não estiver autenticado, renderiza a rota pública (login)
  return <>{children}</>
}

export default PublicRoute
