import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Aside } from '@/components/aside'
import { Header } from '@/components/header'
import { api } from '@/lib/axios'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status

          if (status === 401) {
            localStorage.removeItem('authToken')
            localStorage.removeItem('authTarget')
            navigate('/sign-in', { replace: true })
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />

      <div className="flex flex-1">
        <Aside />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-4 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
