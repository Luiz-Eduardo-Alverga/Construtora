import {
  BadgeX,
  Clock,
  Hourglass,
  LineChart,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

export function PointOptions() {
  return (
    <div className="flex flex-col min-h-screen items-center ">
      <h1 className="flex gap-1 items-center text-center sm:text-left pl-2 pt-2 text-2xl font-medium">
        Gestão de Ponto <ShieldCheck className="h-8 w-8 text-primary" />
      </h1>
      <span className="pl-2 pt-2 text-foreground">
        Navegue por todas as opções de controle de ponto
      </span>

      <div className="flex pt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2  items-center">
          <Button className="p-16 bg-white text-primary hover:bg-slate-100">
            <Users className="w-10 h-10" />
            <span>Usuários</span>
          </Button>

          <Button className="p-16">
            <Clock className="w-10 h-10" />
            <span>Ponto Eletrônico</span>
          </Button>

          <Button className="p-16 bg-white text-primary hover:bg-slate-100">
            <Users className="w-10 h-10" />
            <span>Documentos</span>
          </Button>

          <Button className="p-16">
            <LineChart className="w-10 h-10" />
            <span>Relatórios</span>
          </Button>

          <Button className="p-16 bg-white text-primary hover:bg-slate-100">
            <Hourglass className="w-10 h-10" />
            <span>Banco de Horas</span>
          </Button>

          <Button className="p-16">
            <BadgeX className="w-10 h-10" />
            <span>Faltas</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
