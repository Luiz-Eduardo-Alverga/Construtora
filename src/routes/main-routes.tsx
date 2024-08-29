import { RouteObject } from 'react-router-dom'

import { Dashboard } from '@/pages/app/Dashboard/dashboard'
import { SignIn } from '@/pages/auth/sign-in'
import { AppLayout } from '@/pages/layouts/app'
import { AuthLayout } from '@/pages/layouts/auth'

export const loginRoute: RouteObject = {
  path: '/',
  element: <AuthLayout />,
  children: [{ path: '/', element: <SignIn /> }],
}

export const homeRoute: RouteObject = {
  path: '/app',
  element: <AppLayout />,
  children: [{ path: '/app', element: <Dashboard /> }],
}
