import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from '@/pages/auth/sign-in'
import { AuthLayout } from '@/pages/layouts/auth'

import { Dashboard } from './pages/app/Dashboard/dashboard'
import { AppLayout } from './pages/layouts/app'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/dashboard', element: <Dashboard /> }],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SignIn /> }],
  },
])
