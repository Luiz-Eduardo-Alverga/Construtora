import { useNavigate } from 'react-router-dom'

import { Separator } from '@/components/ui/separator'

import { FormActions } from '../form-actions'

interface FormHeaderProps {
  name: string | null
  label: string | null
  isDeleteButtonVisible?: boolean
  registrationName?: string
}

export function FormHeader({
  name,
  label,
  isDeleteButtonVisible,
  registrationName,
}: FormHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="m-4 text-base space-y-2">
      <div className="flex flex-col gap-4 sm:flex-row justify-between">
        <h1>
          <span className="font-bold text-lg">{label}</span> - {name}
        </h1>

        <FormActions
          registrationName={registrationName}
          isDeleteButtonVisible={isDeleteButtonVisible}
          onCancel={() => navigate(-1)}
          cancelLabel="Cancelar"
          submitLabel="Salvar"
        />
      </div>

      <Separator />
    </div>
  )
}
