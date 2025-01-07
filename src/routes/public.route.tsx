import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface PublicRouteProps {
  children: ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem('authToken')

  if (token) {
    return <Navigate to="/app" />
  }

  return <>{children}</>
}

export default PublicRoute
