import { createBrowserRouter } from 'react-router-dom'

import { homeRoute, loginRoute, notFoundRoute } from './main-routes'
import { pointRoutes } from './ponto/point-routes'

export const router = createBrowserRouter([
  loginRoute,
  homeRoute,
  pointRoutes,
  notFoundRoute,
])
