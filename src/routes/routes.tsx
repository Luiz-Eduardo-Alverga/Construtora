import { createBrowserRouter } from 'react-router-dom'

import { homeRoute, loginRoute, notFoundRoute } from './main-routes'
import { pdfPointsRoute } from './points/pdf-points'
import { pointRoutes } from './points/point-routes'
import { registersRoutes } from './registers/register-routes'

export const router = createBrowserRouter([
  loginRoute,
  homeRoute,
  pointRoutes,
  notFoundRoute,
  registersRoutes,
  pdfPointsRoute,
])
