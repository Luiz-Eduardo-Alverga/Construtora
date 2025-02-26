import { RouteObject } from 'react-router-dom'

import { EmployeeJourney } from '@/pages/app/registers/employee-functions'
import { EditFunctionForm } from '@/pages/app/registers/employee-functions/edit/edit-function.form'
import { Error } from '@/pages/error'
import { AppLayout } from '@/pages/layouts/app'

import ProtectedRoute from '../protected-routes'

export const employeeJourneyRoutes: RouteObject = {
  path: '/cadastros',
  element: (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),
  errorElement: <Error />,
  children: [
    { path: '/cadastros/jornadas', element: <EmployeeJourney /> },
    { path: '/cadastros/jornadas/:id/editar', element: <EditFunctionForm /> },
  ],
}
