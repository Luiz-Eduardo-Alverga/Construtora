import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerNewEmployee } from '@/api/register-new-employee'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerNewEmployeeSchema = z.object({
  name: z.string(),
})

type RegisterNewEmployeeSchema = z.infer<typeof registerNewEmployeeSchema>

interface RegisterNewEmployeeProps {
  onClose?: () => void
}

export function RegisterNewEmployeeDialog({
  onClose,
}: RegisterNewEmployeeProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterNewEmployeeSchema>({
    resolver: zodResolver(registerNewEmployeeSchema),
  })

  const { mutateAsync: newEmployee } = useMutation({
    mutationFn: registerNewEmployee,
  })

  function handleRegisterNewEmployee({ name }: RegisterNewEmployeeSchema) {
    if (name.length < 2) {
      toast.warning('Preencha o nome do funcionario', { closeButton: false })
      return
    }

    try {
      newEmployee({ nome: name })
      toast.success('Funcionário cadastrado com sucesso!')
    } catch {
      toast.error('Erro ao cadastrar usuario')
    }
  }

  return (
    <DialogContent className="space-y-3">
      <DialogHeader>
        <DialogTitle>Novo Funcionário</DialogTitle>
        <DialogDescription>Cadastre um novo funcionário</DialogDescription>
      </DialogHeader>

      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleRegisterNewEmployee)}
      >
        <div className="flex items-center gap-3">
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
        </div>

        <div className="ml-auto space-x-2">
          <DialogClose asChild onClick={onClose}>
            <Button className="ml-auto" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            Cadastrar
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
