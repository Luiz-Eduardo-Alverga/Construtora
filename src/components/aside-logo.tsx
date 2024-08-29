import { ComponentType } from 'react'
import { NavLink } from 'react-router-dom'

interface AsideLogoProps {
  to: string
  icon: ComponentType<{ className?: string }>
}

export function AsideLogo({ to, icon: Icon }: AsideLogoProps) {
  return (
    <NavLink
      to={to}
      className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
    >
      <Icon className="h-4 w-4 transition-all group-hover:scale-110" />
      <span className="sr-only">Acme Inc</span>
    </NavLink>
  )
}
