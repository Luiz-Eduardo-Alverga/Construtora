import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
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

import { SelectEmployeeFunctions } from './employee-function'

const registerNewEmployeeSchema = z.object({
  name: z.string(),
  funcao: z.coerce.number(),
})

type RegisterNewEmployeeSchema = z.infer<typeof registerNewEmployeeSchema>

interface RegisterNewEmployeeProps {
  onClose?: () => void
}

export function RegisterNewEmployeeDialog({
  onClose,
}: RegisterNewEmployeeProps) {
  const registerEmployeeForm = useForm<RegisterNewEmployeeSchema>({
    resolver: zodResolver(registerNewEmployeeSchema),
  })

  const { mutateAsync: newEmployee } = useMutation({
    mutationFn: registerNewEmployee,
  })

  function handleRegisterNewEmployee({
    name,
    funcao,
  }: RegisterNewEmployeeSchema) {
    if (name.length < 2) {
      toast.warning('Preencha o nome do funcionario', { closeButton: false })
      return
    }

    if (funcao === 0) {
      toast.warning('Informe a função do funcionário')
      return
    }

    try {
      newEmployee({ nome: name, funcao })
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

      <FormProvider {...registerEmployeeForm}>
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={registerEmployeeForm.handleSubmit(
            handleRegisterNewEmployee,
          )}
        >
          <div className="grid grid-cols-4 items-center">
            <Label>Nome</Label>
            <Input
              className="col-span-3"
              type="text"
              {...registerEmployeeForm.register('name')}
            />
          </div>

          <div className="grid grid-cols-4 items-center">
            <Label>Função</Label>
            <div className="col-span-3">
              <SelectEmployeeFunctions
                controlName="funcao"
                isDefaultLabelHidden={true}
              />
            </div>
          </div>

          <div className="ml-auto space-x-2">
            <DialogClose asChild onClick={onClose}>
              <Button className="ml-auto" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="ml-auto"
              disabled={registerEmployeeForm.formState.isSubmitting}
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </FormProvider>
    </DialogContent>
  )
}
