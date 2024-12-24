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
  isSubmitting = false,
}: FormActionsProps) {
  return (
    <div className="flex gap-4">
      <Button variant="outline" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : submitLabel}
      </Button>
    </div>
  )
}
