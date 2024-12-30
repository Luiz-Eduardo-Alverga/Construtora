import { Eraser, ListPlus, SquareCheckBig, X } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDateStore } from '@/zustand/useSelectedDatesStore'

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
    reset,
    setValue,
  } = useFormContext()
  const { clearDates } = useDateStore()

  function clearInputs() {
    reset()
    clearDates()
    setValue('funcao', 0)
    setValue('cep', '')
    setValue('ufNasc', '')
    setValue('ufRG', '')
    setValue('cidade', '')

    toast.info('Todos os campos do formulário foram limpados')
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

        <DropdownMenuContent
          align="center"
        >
          <DropdownMenuItem className=" gap-2" onClick={clearInputs}>
            <Eraser className="h-4 w-4" />
            <span>Limpar Campos</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        className="gap-2"
        type="button"
        variant="secondary"
        onClick={onCancel}
      >
        <X className="w-4 h-4" />
        <span>{cancelLabel}</span>
      </Button>
      <Button className="gap-2" onClick={onSubmit} disabled={isSubmitting}>
        <SquareCheckBig className="w-4 h-4" />
        <span>{submitLabel}</span>
      </Button>
    </div>
  )
}
