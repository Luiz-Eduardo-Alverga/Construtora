import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createUser } from '@/api/auth/create-User'
import { LoadingButton } from '@/components/buttons/loadingButton/loading-button'
import { InputPassword } from '@/components/inputs/password/input-password'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { APIError } from '@/interfaces/error'

const createUserSchema = z
  .object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'As senhas devem ser iguais',
    path: ['repeatPassword'],
  })

type CreateUserSchema = z.infer<typeof createUserSchema>

interface SendEmailProps {
  setIsDialogOpen: (arg0: boolean) => void
  setEmail: (arg0: string) => void
}

export function SendEmailForm({ setIsDialogOpen, setEmail }: SendEmailProps) {
  const createUserForm = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = createUserForm

  const { mutateAsync: createUserFn } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      setIsDialogOpen(true)
      reset()
    },
    onError: (error: AxiosError<APIError>) => {
      const errorMessage =
        error.response?.data?.error || 'Ocorreu um erro inesperado'

      toast.error(errorMessage)
    },
  })

  async function handleCreateUser(data: CreateUserSchema) {
    setEmail(data.email)

    await createUserFn({ user: data.email, pwd: data.password })
  }

  return (
    <FormProvider {...createUserForm}>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <InputPassword label="Senha" registerName="password" />

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <InputPassword
                label="Repita a senha"
                registerName="repeatPassword"
              />

              {errors.repeatPassword && (
                <p className="text-sm text-red-500">
                  {errors.repeatPassword.message}
                </p>
              )}
            </div>

            <LoadingButton label="Criar Conta" />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
