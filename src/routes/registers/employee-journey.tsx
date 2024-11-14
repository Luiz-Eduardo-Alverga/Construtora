import { RouteObject } from 'react-router-dom'

import { EmployeeJourney } from '@/pages/app/registers/journey'
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
  children: [{ path: '/cadastros/jornadas', element: <EmployeeJourney /> }],
}
