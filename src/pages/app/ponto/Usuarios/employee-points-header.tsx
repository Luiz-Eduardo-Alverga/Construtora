import { FileClock } from 'lucide-react'

export function EmployeePointsHeader() {
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex flex-row items-center gap-2">
        <h1 className="text-2xl font-medium">Listagem de Pontos</h1>
        <FileClock className="h-8 w-8 text-primary" />
      </div>
      <span className="text-secondary-foreground">
        Verifique os registros de pontos do seu funcionário
      </span>
    </div>
  )
}
