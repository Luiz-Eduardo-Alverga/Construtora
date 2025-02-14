import { RouteObject } from 'react-router-dom'

import { RegisterUser } from '@/pages/app/registers/Users/Users'
import { Error } from '@/pages/error'
import { AppLayout } from '@/pages/layouts/app'

import ProtectedRoute from '../protected-routes'

export const registerUsers: RouteObject = {
  path: '/cadastros/usuarios',
  element: (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
  errorElement: <Error />,
  children: [{ path: '/cadastros/usuarios', element: <RegisterUser /> }],
}
