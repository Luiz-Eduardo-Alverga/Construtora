import { ComponentType, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface NavigationItemProps {
  to: string
  icon: ComponentType<{ className?: string }>
  children: ReactNode
}

export function NavigationItem({
  to,
  icon: Icon,
  children,
}: NavigationItemProps) {
  return (
    <NavLink
      to={to}
      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    >
      <Icon className="h-5 w-5" />
      {children}
    </NavLink>
  )
}
