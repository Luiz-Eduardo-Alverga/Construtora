import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'

interface FormActionsProps {
  onCancel?: () => void
  onSubmit?: () => void
  cancelLabel?: string
  submitLabel?: string
  isSubmitting?: boolean
}

export function FormActions({
  onCancel,
  onSubmit,
  cancelLabel = 'Cancelar',
  submitLabel = 'Enviar',
}: FormActionsProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext()
  return (
    <div className="flex gap-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button onClick={onSubmit} disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </div>
  )
}
