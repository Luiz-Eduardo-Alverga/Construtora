import { Navigate } from 'react-router-dom'

export function NotFound() {
  // Redireciona imediatamente para a rota /sign-in
  return <Navigate to="/sign-in" replace />
}
