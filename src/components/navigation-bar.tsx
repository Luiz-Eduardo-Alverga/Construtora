import { ClockArrowUp, Menu, Users } from 'lucide-react'

// import { ExpandableMenu } from './expandable-menu'
import { NavigationItem } from './navigation-item'
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
          <img
            src="https://softcomshop.s3-us-west-2.amazonaws.com/img/logo_softcom.png"
            alt=""
            className="h-10"
          />

          <NavigationItem to="/dashboard" icon={Users}>
            Funcionários
          </NavigationItem>

          {/* <ExpandableMenu title="Products" icon={Package}>
            <NavigationItem to="/sub-option-1" icon={Package2}>
              Sub Option 1
            </NavigationItem>
            <NavigationItem to="/sub-option-2" icon={Package2}>
              Sub Option 2
            </NavigationItem>
            <NavigationItem to="/sub-option-3" icon={Package2}>
              Sub Option 3
            </NavigationItem>
          </ExpandableMenu> */}

          <NavigationItem to="/ponto" icon={ClockArrowUp}>
            Ponto
          </NavigationItem>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
