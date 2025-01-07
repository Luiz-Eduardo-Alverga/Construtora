import { useMutation } from '@tanstack/react-query'
import {
  ArrowLeft,
  Eraser,
  ListPlus,
  SquareCheckBig,
  Trash2,
} from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { deleteFunction } from '@/api/employeeFunctions/delete-function'
import { DeleteModal } from '@/components/delete/delete-modal'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDateStore, useFormStore } from '@/zustand/useSelectedDatesStore'

interface FormActionsProps {
  onCancel?: () => void
  onSubmit?: () => void
  cancelLabel?: string
  submitLabel?: string
  registerId?: number
  isSubmitting?: boolean
  isDeleteButtonVisible?: boolean
  registrationName?: string
}

export function FormActions({
  onCancel,
  cancelLabel = 'Cancelar',
  submitLabel = 'Enviar',
}: FormActionsProps) {
  const { isDeleteButtonVisible, registerId, registrationName } = useFormStore()

  const {
    formState: { isSubmitting },
    reset,
    setValue,
  } = useFormContext()
  const { clearDates } = useDateStore()

  const navigate = useNavigate()

  function clearInputs() {
    reset()
    clearDates()
    setValue('funcao', 0)
    setValue('ufNasc', '')
    setValue('ufRG', '')

    toast.info('Todos os campos do formulário foram limpados')
  }

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="bg-blue-500 gap-2 text-white hover:bg-blue-500/90 hover:text-white"
          >
            <ListPlus className="w-4 h-4" />
            <span> Mais opçoes</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center">
          <DropdownMenuItem className=" gap-2" onClick={clearInputs}>
            <Eraser className="h-4 w-4" />
            <span>Limpar Campos</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
          deleteEmployee={handleDeleteRegistration}
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
