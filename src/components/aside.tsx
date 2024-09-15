import { ClockArrowUp, Home, Users } from 'lucide-react'

import { AsideLogo } from './aside-logo'
import { AsideNavItem } from './aside-nav-item'

export function Aside() {
  return (
    <aside className="inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <AsideLogo to="/" icon={Home} />

        <AsideNavItem
          to="/cadastros/funcionarios"
          icon={Users}
          label="Dashboard"
        />
        {/* <AsideNavItem to="/orders" icon={ShoppingCart} label="Orders" />
        <AsideNavItem to="/products" icon={Package} label="Products" />
        <AsideNavItem to="/customers" icon={Users2} label="Customers" /> */}
        <AsideNavItem to="/ponto" icon={ClockArrowUp} label="Ponto" />
      </nav>
    </aside>
  )
}
