import { Search, Watch } from 'lucide-react'

import { HeaderPages } from '@/components/header-pages'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function EmployeeJourney() {
  return (
    <div className="m-2 space-y-6">
      <HeaderPages
        title="Jornadas de Trabalho"
        description="Cadastre ou visualize as suas jornadas de trabalho"
        icon={Watch}
      />

      <div className="flex justify-between">
        <form className="flex gap-2">
          <Input className="w-64" placeholder="Pesquise pelo nome da função" />
          <Button type="submit">
            <Search className="w-full mr-2 h-5 sm:w-5" />
            Filtrar resultado
          </Button>
        </form>

        <Button variant={'outline'}>Nova Função</Button>
      </div>

      <div className="mt-24 grid grid-cols-3 gap-4">
        <div className="flex flex-col p-4 border rounded-md hover:bg-secondary hover:cursor-pointer">
          <div className="w-full flex justify-between">
            <span className="text-base">Pedreiro</span>
            <span className="text-sm">5 dias</span>
          </div>

          <span className="text-xs mt-2 dark:text-zinc-300 text-zinc-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum sint
            illum similique hic ut tempora optio vitae quae corporis explicabo
            quibusdam
          </span>

          <div className="mt-auto space-x-1 ml-auto">
            <Badge>SEG</Badge>
            <Badge>TER</Badge>
            <Badge>QUA</Badge>
            <Badge>QUI</Badge>
            <Badge>SEX</Badge>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4 border rounded-md hover:bg-secondary hover:cursor-pointer">
          <div className="w-full flex justify-between">
            <span className="text-base">Engenheiro</span>
            <span className="text-sm">3 dias</span>
          </div>

          <span className="text-xs  dark:text-zinc-300 text-zinc-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum sint
            illum similique hic ut tempora optio vitae quae corporis explicabo
            quibusdam
          </span>

          <div className="mt-auto space-x-1 ml-auto">
            <Badge>SEG</Badge>
            <Badge>TER</Badge>
            <Badge>QUA</Badge>
          </div>
        </div>

        <div className="flex flex-col p-4 border rounded-md hover:bg-secondary hover:cursor-pointer">
          <div className="w-full flex justify-between">
            <span className="text-base">N2</span>
            <span className="text-sm">5 dias</span>
          </div>

          <span className="text-xs mt-2 dark:text-zinc-300 text-zinc-500">
            Lorem ipsum dolor
          </span>

          <div className="space-x-1 mt-auto ml-auto">
            <Badge>Nao tralha</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
