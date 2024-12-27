import { RouteObject } from 'react-router-dom'

import { RegisterEmployeeForm } from '@/pages/app/registers/employeers/editEmployee/edit-employee-form'
import { Employeers } from '@/pages/app/registers/employeers/employeers'
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
