import { useNavigate } from 'react-router-dom'

import { Separator } from '@/components/ui/separator'

import { FormActions } from '../form-actions'

interface FormHeaderProps {
  employeeName: string | null
}

export function FormHeader({ employeeName }: FormHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="m-4 text-base space-y-2">
      <div className="flex justify-between">
        <h1>
          <span className="font-bold text-lg">Funcionário</span> -{' '}
          {employeeName}
        </h1>

        <FormActions
          onCancel={() => navigate(-1)}
          cancelLabel="Cancelar"
          submitLabel="Salvar"
        />
      </div>

      <Separator />
    </div>
  )
}
