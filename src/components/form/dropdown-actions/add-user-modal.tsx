import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { addUserFn } from '@/api/auth/add-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { APIError } from '@/interfaces/error'

const addUserSchema = z.object({
  email: z.string().email(),
})

type AddUserSchema = z.infer<typeof addUserSchema>

export function AddUserModal() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<AddUserSchema>({
    resolver: zodResolver(addUserSchema),
  })

  const { mutateAsync: addUser } = useMutation({
    mutationFn: addUserFn,
    onSuccess: () =>
      toast.success('Usuário vinculado com sucesso', {
        closeButton: false,
      }),
    onError: (error: AxiosError<APIError>) => {
      const errorMessage =
        error.response?.data?.error || 'Ocorreu um erro inesperado'

      toast.error(errorMessage)
    },
  })

  async function handleAddUser(data: AddUserSchema) {
    const enterpriseName = localStorage.getItem('enterpriseName')

    await addUser({
      user: data.email,
      desativado: 0,
      nomeEmpresa: enterpriseName,
    })
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleSubmit(handleAddUser)()
      }}
    >
      <span>Digite o E-mail que o usuário fez a autenticação</span>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input type="email" {...register('email')} />
      </div>

      <Button disabled={isSubmitting} className="ml-auto" type="submit">
        Confirmar
      </Button>
    </form>
  )
}
