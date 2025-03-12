import { useMutation } from '@tanstack/react-query'
import { ArrowLeft, SquareCheckBig, Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { deleteFunction } from '@/api/employee-functions/delete-function'
import { DeleteModal } from '@/components/delete/delete-modal'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useFormStore } from '@/zustand/useSelectedDatesStore'

import { DropdownActions } from './dropdown-actions'

interface FormActionsProps {
  onCancel?: () => void
  cancelLabel?: string
  submitLabel?: string
  visibleItems: Array<'workload' | 'clearInputs' | 'addUser'>
}

export function FormActions({
  onCancel,
  cancelLabel = 'Cancelar',
  submitLabel = 'Enviar',
  visibleItems,
}: FormActionsProps) {
  const { isDeleteButtonVisible, registerId, registrationName } = useFormStore()

  const {
    formState: { isSubmitting },
  } = useFormContext()

  const navigate = useNavigate()

  const { mutateAsync: deleteSelectedFunction } = useMutation({
    mutationFn: () => deleteFunction({ id: registerId }),
  })

  async function handleDeleteRegistration() {
    try {
      await deleteSelectedFunction()
      navigate(-1)
      toast.success('Função deletada com sucesso')
    } catch {
      toast.error('Erro ao excluir função')
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <DropdownActions visibleItems={visibleItems} />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className={isDeleteButtonVisible ? 'gap-2' : 'sr-only'}
            variant={'destructive'}
            type="button"
          >
            <Trash2 className="h-4 w-4" />
            <span>Excluir</span>
          </Button>
        </AlertDialogTrigger>

        <DeleteModal
          prefixLabel="a"
          deleteFunction={handleDeleteRegistration}
          label="função"
          register={registrationName || ''}
        />
      </AlertDialog>

      <Button
        className="gap-2"
        type="button"
        variant="secondary"
        onClick={onCancel}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{cancelLabel}</span>
      </Button>
      <Button className="gap-2" disabled={isSubmitting}>
        <SquareCheckBig className="w-4 h-4" />
        <span>{submitLabel}</span>
      </Button>
    </div>
  )
}
