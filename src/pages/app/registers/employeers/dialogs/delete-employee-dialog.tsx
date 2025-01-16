import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteEmployee } from '@/api/employee/delete-employee'
import { DeleteModal } from '@/components/delete/delete-modal'

interface DeleteEmployeeProps {
  id: string | null
  name: string | null
  onDelete?: (id: string | null) => void
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
      toast.error(
        'Funcionário não pode ser excluido, pois já existem pontos registrados',
      )
    },
  })

  async function handleDeleteEmployee() {
    await deleteSelectedEmployee()
  }

  return (
    <DeleteModal
      prefixLabel="o"
      label="usuário"
      deleteEmployee={handleDeleteEmployee}
      register={name || ''}
    />
  )
}
