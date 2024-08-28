import { Hammer, Power } from 'lucide-react'

import { NavLink } from './nav-link'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-12 items-center gap-6 px-6">
        <div className="flex gap-2">
          <Hammer className="h-9 w-9 " />
        </div>
        <Separator orientation="vertical" className="h-6" />

        <div className="ml-auto flex items-center gap-2">
          <NavLink to="">
            <Power />
          </NavLink>
        </div>
      </div>
    </div>
  )
}
