import {
  ChevronDown,
  ChevronUp,
  Home,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
export function NavigatioBar() {
  const [expanded, setExpanded] = useState(false)
  const [height, setHeight] = useState('0px')
  const contentRef = useRef<HTMLDivElement | null>(null)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    if (expanded && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`)
    } else {
      setHeight('0px')
    }
  }, [expanded])

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

          <div>
            <button
              onClick={toggleExpanded}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground w-full text-left"
            >
              <span className="flex items-center gap-4">
                <Package className="h-5 w-5" />
                Products
              </span>
              {expanded ? (
                <ChevronUp className="h-5 w-5 ml-auto" />
              ) : (
                <ChevronDown className="h-5 w-5 ml-auto" />
              )}
            </button>
            <div
              ref={contentRef}
              style={{ height }}
              className="overflow-hidden transition-all duration-300 ease-in-out"
            >
              <div className="pl-10 mt-2  transition-opacity duration-300 ease-in-out">
                <NavLink
                  to="/sub-option-1"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  Sub Option 1
                </NavLink>
                <NavLink
                  to="/sub-option-2"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  Sub Option 2
                </NavLink>
                <NavLink
                  to="/sub-option-3"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  Sub Option 3
                </NavLink>
              </div>
            </div>
          </div>

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
        </nav>
      </SheetContent>
    </Sheet>
  )
}
