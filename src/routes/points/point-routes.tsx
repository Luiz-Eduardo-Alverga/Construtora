import { RouteObject } from 'react-router-dom'

import { PointOptions } from '@/pages/app/point'
import { EmployeePoints } from '@/pages/app/point/employeers/employee-points'
import { AppLayout } from '@/pages/layouts/app'

import ProtectedRoute from '../protected-routes'

// import ProtectedRoute from '../protected-route'

export const pointRoutes: RouteObject = {
  path: '/ponto',
  element: (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: '/ponto', element: <PointOptions /> },
    { path: '/ponto/usuarios', element: <EmployeePoints /> },
  ],
}
