import { useNavigate } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'

interface FunctionsCardsProps {
  id?: number
  title?: string
  description?: string
  diasJornada?: {
    segunda: boolean
    terca: boolean
    quarta: boolean
    quinta: boolean
    sexta: boolean
    sabado: boolean
    domingo: boolean
  }
}

export function FunctionsCard({
  id,
  title,
  description,
  diasJornada,
}: FunctionsCardsProps) {
  const navigate = useNavigate()

  const qtdDiasTrabalhado = diasJornada
    ? Object.values(diasJornada).filter((dia) => dia).length
    : 0

  return (
    <>
      <div
        onDoubleClick={() => navigate(`${id}/editar`)}
        className="flex flex-col p-4 border rounded-md hover:bg-secondary hover:cursor-pointer"
      >
        <div className="w-full flex justify-between">
          <span className="text-base">{title}</span>

          <span className="text-sm">{qtdDiasTrabalhado} dia(s)</span>
        </div>

        <span className="text-xs mt-2 dark:text-zinc-300 text-zinc-500">
          {description}
        </span>

        <div className="mt-auto space-x-1 ml-auto pt-2">
          {diasJornada?.segunda && <Badge>SEG</Badge>}
          {diasJornada?.terca && <Badge>TER</Badge>}
          {diasJornada?.quarta && <Badge>QUA</Badge>}
          {diasJornada?.quinta && <Badge>QUI</Badge>}
          {diasJornada?.sexta && <Badge>SEX</Badge>}
          {diasJornada?.sabado && <Badge>SAB</Badge>}
          {diasJornada?.domingo && <Badge>DOM</Badge>}
        </div>
      </div>
    </>
  )
}
