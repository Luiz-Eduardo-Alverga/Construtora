import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteEmployee } from '@/api/delete-employee'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface DeleteEmployeeProps {
  id: string | null
  name: string | null
}

export function DeleteEmployeeDialog({ id, name }: DeleteEmployeeProps) {
  const { mutateAsync: deleteSelectedEmployee } = useMutation({
    mutationFn: () => deleteEmployee({ id: id || '' }),
  })

  async function handleDeleteEmployee() {
    try {
      await deleteSelectedEmployee()
      toast.success(`Funcionário ${name} deletado com sucesso`)
    } catch {
      console.log('deu erro')
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Essa ação não pode ser desfeita. Isso irá deletar permanentemente o
          usuário <span className="font-extrabold">{name}</span>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button asChild variant={'ghost'}>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </Button>

        <Button asChild variant={'destructive'} onClick={handleDeleteEmployee}>
          <AlertDialogAction>Continuar</AlertDialogAction>
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
