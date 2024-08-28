import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="sm:grid sm:min-h-screen sm:grid-cols-2 antialiased">
      <div className="hidden sm:flex sm:h-full sm:flex-col sm:justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">point-control</span>
        </div>

        <footer className="text-sm">
          Painel do parceiro &copy; point-control - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative sm:flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
