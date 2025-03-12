import { useMutation } from '@tanstack/react-query'
import { BadgeCheck, ChevronsUpDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { logout } from '@/api/auth/logout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { InviteUserModal } from './modal/invite-user'

export function NavUser() {
  const { isMobile } = useSidebar()

  const navigate = useNavigate()

  const { mutateAsync: userLogout } = useMutation({
    mutationFn: logout,
  })

  async function handleLogout() {
    try {
      await userLogout()
      navigate('/sign-in')
    } catch {
      console.log('Logout realizado')
      // toast.error('Erro ao fazer logout')
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Luiz</span>
                  <span className="truncate text-xs">Luiz Email</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Luiz</span>
                    <span className="truncate text-xs">Luiz Email</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="space-x-2">
                  <DialogTrigger>
                    <BadgeCheck className="text-emerald-500" />
                    <span>Convidar usuários</span>
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="space-x-2">
                <LogOut className="text-red-400" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="sm:max-w-md">
            <InviteUserModal />
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
