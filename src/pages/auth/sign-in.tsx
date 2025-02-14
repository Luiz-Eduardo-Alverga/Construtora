import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/auth/sign-in'
import { LoadingButton } from '@/components/buttons/loadingButton/loading-button'
import { InputPassword } from '@/components/inputs/password/input-password'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  username: z.string().email({ message: 'E-mail Inválido' }),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const signInForm = useForm<SignInForm>()

  const { register, handleSubmit } = signInForm

  const navigate = useNavigate()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ user: data.username, pwd: data.password })

      navigate('/empresas', { state: { email: data.username } })
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || 'Erro de autenticação'
        toast.error(errorMessage)
      } else if (error instanceof Error) {
        toast.error(error.message || 'Erro desconhecido')
      } else {
        toast.error('Ocorreu um erro inesperado.')
      }
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="min-h-screen p-8 sm:p-0 sm:w-[350px] flex flex-col sm:justify-center gap-10 sm:gap-6">
        <div className="flex flex-col gap-8 sm:gap-2 sm:text-center">
          <h1 className="text-3xl sm:text-2xl font-semibold tracking-tight">
            Controltek
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe seus horários pelo painel do parceiro
          </p>
        </div>
        <FormProvider {...signInForm}>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="username">Seu E-mail</Label>
              <Input
                type="email"
                className="text-base"
                id="username"
                {...register('username')}
              />
            </div>

            <InputPassword label="Sua senha" registerName="password" />

            <LoadingButton
              label="Acessar painel"
              className="w-full p-6 sm:p-0"
            />
          </form>
        </FormProvider>
      </div>
    </>
  )
}
