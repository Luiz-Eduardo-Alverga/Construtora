import { RouteObject } from 'react-router-dom'

import { Employeers } from '@/pages/app/registers/employeers'
import { RegisterEmployeeForm } from '@/pages/app/registers/employeers/edit-employee/edit-employee-form'
import { Error } from '@/pages/error'
import { AppLayout } from '@/pages/layouts/app'

import ProtectedRoute from '../protected-routes'

export const registersRoutes: RouteObject = {
  path: '/cadastros',
  element: (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
  errorElement: <Error />,
  children: [
    { path: '/cadastros/funcionarios', element: <Employeers /> },
    {
      path: '/cadastros/funcionarios/:id/editar',
      element: <RegisterEmployeeForm />,
    },
  ],
}
