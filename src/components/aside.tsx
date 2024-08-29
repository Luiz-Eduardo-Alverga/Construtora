import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users2,
} from 'lucide-react'

import { AsideLogo } from './aside-logo'
import { AsideNavItem } from './aside-nav-item'

export function Aside() {
  return (
    <aside className="inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <AsideLogo to="/" icon={Package2} />

        <AsideNavItem to="/dashboard" icon={Home} label="Dashboard" />
        <AsideNavItem to="/orders" icon={ShoppingCart} label="Orders" />
        <AsideNavItem to="/products" icon={Package} label="Products" />
        <AsideNavItem to="/customers" icon={Users2} label="Customers" />
        <AsideNavItem to="/analytics" icon={LineChart} label="Analytics" />
      </nav>
    </aside>
  )
}
