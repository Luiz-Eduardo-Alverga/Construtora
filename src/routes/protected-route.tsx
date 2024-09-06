import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

// Função para verificar se o token está presente (autenticado)
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken')
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Redireciona para login se não estiver autenticado
  if (!isAuthenticated()) {
    return <Navigate to="/" />
  }

  // Renderiza o conteúdo da rota protegida se estiver autenticado
  return <>{children}</>
}

export default ProtectedRoute