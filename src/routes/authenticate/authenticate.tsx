import { RouteObject } from 'react-router-dom'

import { Authenticate } from '@/pages/auth/createUser'
import { Error } from '@/pages/error'

export const authenticateUser: RouteObject = {
  path: '/cadastrar/usuario',
  element: <Authenticate />,
  errorElement: <Error />,
}
