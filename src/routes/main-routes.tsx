import { RouteObject } from 'react-router-dom'

import { NotFound } from '@/pages/404'
import { Dashboard } from '@/pages/app/dashboard'
import { UsersEnterprises } from '@/pages/auth/enterprise'
import { SignIn } from '@/pages/auth/sign-in'
import { Error } from '@/pages/error'
import { AppLayout } from '@/pages/layouts/app'
import { AuthLayout } from '@/pages/layouts/auth'

import ProtectedRoute from './protected-routes'
import PublicRoute from './public.route'

export const loginRoute: RouteObject = {
  path: '/sign-in',
  element: (
    <PublicRoute>
      <AuthLayout />
    </PublicRoute>
  ),
  errorElement: <Error />,
  children: [{ path: '/sign-in', element: <SignIn /> }],
}

export const enterpriseRoute: RouteObject = {
  path: '/empresas',
  element: (
    <ProtectedRoute>
      <UsersEnterprises />
    </ProtectedRoute>
  ),
}

export const homeRoute: RouteObject = {
  path: '/app',
  element: (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  ),

  children: [{ path: '/app', element: <Dashboard /> }],
}

export const notFoundRoute: RouteObject = {
  path: '*',
  element: <NotFound />,
}
