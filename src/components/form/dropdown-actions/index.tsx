import { Clock, Eraser, ListPlus, User } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { DialogHeaderTitle } from '@/components/dialogs/dialog-title'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Workload } from '@/components/workoad'
import { useDateStore } from '@/zustand/useSelectedDatesStore'

import { AddUserModal } from './add-user-modal'

interface DropdownActionsProps {
  visibleItems: Array<'workload' | 'clearInputs' | 'addUser'>
}

export function DropdownActions({ visibleItems }: DropdownActionsProps) {
  const [modalContent, setModalContent] = useState<
    'workload' | 'addUser' | null
  >(null)
  const { clearDates } = useDateStore()
  const { reset, setValue } = useFormContext()

  function clearInputs() {
    reset()
    clearDates()
    setValue('funcao', 0)
    setValue('ufNasc', '')
    setValue('ufRG', '')

    toast.info('Todos os campos do formulário foram limpados')
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="bg-blue-500 gap-2 text-white hover:bg-blue-500/90 hover:text-white"
          >
            <ListPlus className="w-4 h-4" />
            <span> Mais opções</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center">
          {visibleItems.includes('clearInputs') && (
            <DropdownMenuItem className="gap-2" onClick={clearInputs}>
              <Eraser className="h-4 w-4" />
              <span>Limpar Campos</span>
            </DropdownMenuItem>
          )}

          {visibleItems.includes('workload') && (
            <DropdownMenuItem
              onClick={() => setModalContent('workload')}
              asChild
              className="gap-2"
            >
              <DialogTrigger>
                <Clock className="h-4 w-4" />
                <span>Jornada de trabalho</span>
              </DialogTrigger>
            </DropdownMenuItem>
          )}

          {visibleItems.includes('addUser') && (
            <DropdownMenuItem
              onClick={() => setModalContent('addUser')}
              asChild
              className="gap-2 w-full"
            >
              <DialogTrigger>
                <User className="h-4 w-4" />
                <span>Vincular Usuário</span>
              </DialogTrigger>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        {modalContent === 'workload' && (
          <>
            <DialogHeaderTitle title="Edite a jornada de trabalho" />
            <Workload
              isButtonCloseDialog
              isBackButtonVisible={false}
              registerName="horas"
            />
          </>
        )}

        {modalContent === 'addUser' && (
          <>
            <DialogHeaderTitle title="Vincule um usuário ao funcionário" />
            <AddUserModal />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
