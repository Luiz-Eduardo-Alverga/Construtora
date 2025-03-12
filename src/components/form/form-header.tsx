import { useNavigate } from 'react-router-dom'

import { Separator } from '@/components/ui/separator'

import { FormActions } from './form-actions'

interface FormHeaderProps {
  name: string | null
  label: string | null
  visibleItems: Array<'workload' | 'clearInputs' | 'addUser'>
}

export function FormHeader({ name, label, visibleItems }: FormHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="m-4 text-base space-y-2">
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <h1>
          <span className="font-bold text-lg">{label}</span> - {name}
        </h1>

        <FormActions
          visibleItems={visibleItems}
          onCancel={() => navigate(-1)}
          cancelLabel="Voltar"
          submitLabel="Salvar"
        />
      </div>

      <Separator />
    </div>
  )
}
