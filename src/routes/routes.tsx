import { createBrowserRouter, Navigate } from 'react-router-dom'

import { authenticateUser } from './authenticate/authenticate'
import {
  enterpriseRoute,
  homeRoute,
  loginRoute,
  notFoundRoute,
} from './main-routes'
import { pdfPointsRoute } from './points/pdf-points'
import { pointRoutes } from './points/point-routes'
import { employeeJourneyRoutes } from './registers/register-function'
import { registersRoutes } from './registers/register-routes'
import { registerUsers } from './registers/register-user'

export const router = createBrowserRouter([
  loginRoute,
  homeRoute,
  pointRoutes,
  notFoundRoute,
  registersRoutes,
  pdfPointsRoute,
  employeeJourneyRoutes,
  enterpriseRoute,
  registerUsers,
  authenticateUser,
  {
    path: '/',
    element: <Navigate to="/sign-in" replace />,
  },
])
