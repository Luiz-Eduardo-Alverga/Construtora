import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users2,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
export function NavigatioBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="overflow-y-auto sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <NavLink
            to=""
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </NavLink>

          <span className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            <Home className="h-5 w-5" />
            Dashboard
          </span>
          <NavLink
            to=""
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </NavLink>
          <NavLink
            to=""
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Package className="h-5 w-5" />
            Products
          </NavLink>
          <NavLink
            to=""
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </NavLink>
          <NavLink
            to=""
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
