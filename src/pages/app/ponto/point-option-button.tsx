import { ComponentType } from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'

interface PointOptionButtonProps {
  to: string
  icon: ComponentType<{ className?: string }>
  label: string
  bgColor?: string
  textColor?: string
  hoverBg?: string
}

export function PointOptionButton({
  to,
  icon: Icon,
  label,
  bgColor,
  textColor,
  hoverBg,
}: PointOptionButtonProps) {
  return (
    <NavLink to={to} className="block">
      <Button
        className={`w-full h-full p-16 ${bgColor} ${textColor} hover:${hoverBg}`}
      >
        <Icon className="hidden sm:block sm:w-10 sm:h-10" />

        <span>{label}</span>
      </Button>
    </NavLink>
  )
}
