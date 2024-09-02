import { RouteObject } from 'react-router-dom'

import { PointOptions } from '@/pages/app/ponto/point'
import { UsersPoint } from '@/pages/app/ponto/Usuarios/users-point'
import { AppLayout } from '@/pages/layouts/app'

export const pointRoutes: RouteObject = {
  path: '/ponto',
  element: <AppLayout />,
  children: [
    { path: '/ponto', element: <PointOptions /> },
    { path: '/ponto/usuarios', element: <UsersPoint /> },
  ],
}
