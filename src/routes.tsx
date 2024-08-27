import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from '@/pages/auth/sign-in'
import { AuthLayout } from '@/pages/layouts/auth'

import { Dashboard } from './pages/app/Dashboard/dashboard'
import { AppLayout } from './pages/layouts/app'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/', element: <SignIn /> }],
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [{ path: '/app/dashboard', element: <Dashboard /> }],
  },
])
