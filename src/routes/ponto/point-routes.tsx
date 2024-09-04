import { RouteObject } from 'react-router-dom'

import { PointOptions } from '@/pages/app/ponto/point'
import { EmployeePoints } from '@/pages/app/ponto/Usuarios/employee-points'
import { AppLayout } from '@/pages/layouts/app'

export const pointRoutes: RouteObject = {
  path: '/ponto',
  element: <AppLayout />,
  children: [
    { path: '/ponto', element: <PointOptions /> },
    { path: '/ponto/usuarios', element: <EmployeePoints /> },
  ],
}
