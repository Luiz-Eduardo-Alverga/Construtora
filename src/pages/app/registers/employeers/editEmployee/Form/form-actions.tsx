import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useDateStore } from '@/zustand/useSelectedDatesStore'
import { toast } from 'sonner'

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
    formState: { isSubmitting }, reset, setValue
  } = useFormContext()
  const {clearDates} = useDateStore()

  function clearInputs () {
    reset()
    clearDates()
    setValue('funcao', 0)
    setValue('cep', "") 
    setValue("ufNasc", "")
    setValue("ufRG", "")

    toast.info("Todos os campos do formulário foram limpados")

    
  }
  return (
    <div className="flex gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} className='bg-blue-500 text-white hover:bg-blue-400 hover:text-white'>Mais opçoes</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='center' className='--radix-dropdown-menu-content-available-width'>
          <DropdownMenuItem className='disabled:cursor-not-allowed' onClick={clearInputs}>
            Limpar Campos
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button  type="button" variant="outline" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button  onClick={onSubmit} disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </div>
  )
}
