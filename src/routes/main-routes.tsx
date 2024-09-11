import { RouteObject } from 'react-router-dom'

import { NotFound } from '@/pages/404'
import { Dashboard } from '@/pages/app/Dashboard/dashboard'
import { SignIn } from '@/pages/auth/sign-in'
import { Error } from '@/pages/error'
import { AppLayout } from '@/pages/layouts/app'
import { AuthLayout } from '@/pages/layouts/auth'

import ProtectedRoute from './protected-route'
import PublicRoute from './public-route'

export const loginRoute: RouteObject = {
  path: '/',
  element: (
    <PublicRoute>
      <AuthLayout />
    </PublicRoute>
  ),
  errorElement: <Error />,
  children: [{ path: '/', element: <SignIn /> }],
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
