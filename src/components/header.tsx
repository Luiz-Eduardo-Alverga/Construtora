import { Power } from 'lucide-react'

import { NavLink } from './nav-link'
import { NavigatioBar } from './navigation-bar'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-12 items-center gap-4 px-6">
        <div className="hidden sm:flex sm:gap-2">
          <img
            src="https://softcomshop.s3-us-west-2.amazonaws.com/img/logo.png"
            alt=""
            className="h-8"
          />
        </div>

        <Separator orientation="vertical" className="hidden sm:h-6 sm:flex" />

        <NavigatioBar />

        <div className="ml-auto flex items-center gap-2">
          <NavLink to="">
            <Power />
          </NavLink>
        </div>
      </div>
    </div>
  )
}
