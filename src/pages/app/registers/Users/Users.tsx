import { User } from 'lucide-react'

import { HeaderPages } from '@/components/header-pages'

export function RegisterUser() {
  return (
    <>
      <HeaderPages
        title="Meu Perfil"
        description="Gerencie as informações da sua conta"
        icon={User}
      />
    </>
  )
}
