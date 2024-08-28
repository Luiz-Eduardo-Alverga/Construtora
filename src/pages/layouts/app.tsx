import { Outlet } from 'react-router-dom'

import { Aside } from '@/components/aside'
import { Header } from '@/components/header'

export function AppLayout() {
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
