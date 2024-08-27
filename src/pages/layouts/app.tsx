import { Outlet } from 'react-router-dom'

import { Aside } from '@/components/aside'

export function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Aside />

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-20">
        <Outlet />
      </div>
    </div>
  )
}
