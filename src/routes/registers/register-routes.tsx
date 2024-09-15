import { RouteObject } from 'react-router-dom'

import { Employeers } from '@/pages/app/registers/employeers/employeers'
import { RegisterEmployeeForm } from '@/pages/app/registers/employeers/register-employee-form'
import { AppLayout } from '@/pages/layouts/app'

import ProtectedRoute from '../protected-route'

export const registersRoutes: RouteObject = {
  path: '/cadastros',
  element: (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: '/cadastros/funcionarios', element: <Employeers /> },
    {
      path: '/cadastros/funcionarios/:id/editar',
      element: <RegisterEmployeeForm />,
    },
  ],
}
