import {
  BadgeX,
  Clock,
  Files,
  Hourglass,
  LineChart,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { PointOptionButton } from './point-option-button'

export function PointOptions() {
  return (
    <>
      <Helmet title="Ponto" />
      <div className="pt-3 flex flex-col items-center">
        <h1 className="flex gap-1 sm:text-left pl-2 pt-2 text-2xl font-medium">
          Gestão de Ponto <ShieldCheck className="h-8 w-8 text-primary" />
        </h1>
        <span className="pl-2 pt-2 text-zinc-400">
          Navegue por todas as opções de controle de ponto
        </span>

        <div className="flex pt-10 m-2">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center">
            <PointOptionButton
              icon={Users}
              label="Usuários"
              to="/ponto/usuarios"
              bgColor="bg-primary-foreground"
              textColor="text-primary"
              hoverBg="bg-zinc-500"
            />

            <PointOptionButton
              icon={Clock}
              label="Ponto Eletrônico"
              to="/ponto/ponto-eletronico"
              bgColor="bg-primary"
            />

            <PointOptionButton
              icon={Files}
              label="Documentos"
              to="/ponto/documentos"
              bgColor="bg-primary-foreground"
              textColor="text-primary"
              hoverBg="bg-slate-100"
            />

            <PointOptionButton
              icon={LineChart}
              label="Relatórios"
              to="/ponto/relatórios"
              bgColor="bg-primary"
            />

            <PointOptionButton
              icon={Hourglass}
              label="Banco de Horas"
              to="/ponto/banco-de-horas"
              bgColor="bg-primary-foreground"
              textColor="text-primary"
              hoverBg="bg-slate-100"
            />

            <PointOptionButton
              icon={BadgeX}
              label="Faltas"
              to="/ponto/faltas"
              bgColor="bg-primary"
            />
          </div>
        </div>
      </div>
    </>
  )
}
