import { createBrowserRouter, Navigate } from 'react-router-dom'

import {
  enterpriseRoute,
  homeRoute,
  loginRoute,
  notFoundRoute,
} from './main-routes'
import { pdfPointsRoute } from './points/pdf-points'
import { pointRoutes } from './points/point-routes'
import { employeeJourneyRoutes } from './registers/employee-journey'
import { registersRoutes } from './registers/register-routes'

export const router = createBrowserRouter([
  loginRoute,
  homeRoute,
  pointRoutes,
  notFoundRoute,
  registersRoutes,
  pdfPointsRoute,
  employeeJourneyRoutes,
  enterpriseRoute,
  {
    path: '/',
    element: <Navigate to="/sign-in" replace />,
  },
])
