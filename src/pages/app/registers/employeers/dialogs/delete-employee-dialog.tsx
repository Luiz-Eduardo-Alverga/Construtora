import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteEmployee } from '@/api/employee/delete-employee'
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
  onDelete?: (id: string | null) => void // Novo prop para callback de exclusão
}

export function DeleteEmployeeDialog({
  id,
  name,
  onDelete,
}: DeleteEmployeeProps) {
  const queryClient = useQueryClient()
  const { mutateAsync: deleteSelectedEmployee } = useMutation({
    mutationFn: () => deleteEmployee({ id: id || '' }),
    onSuccess: () => {
      if (onDelete) onDelete(id)
      queryClient.invalidateQueries({
        queryKey: ['Employeers'],
        refetchType: 'active',
      })
      toast.success(`Funcionário ${name} deletado com sucesso`, {
        position: 'top-center',
      })
    },
    onError: () => {
      toast.error('Erro ao deletar o funcionário')
    },
  })

  async function handleDeleteEmployee() {
    await deleteSelectedEmployee()
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
