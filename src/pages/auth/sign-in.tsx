import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/auth/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  username: z.string().email({ message: 'E-mail Inválido' }),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

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

        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="username">Seu E-mail</Label>
            <Input
              type="email"
              className="h-12 text-base"
              id="username"
              {...register('username')}
            />
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password">Sua senha</Label>
            <Input
              className="h-12 text-base pr-10"
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />

            <button
              type="button"
              className="absolute right-2 top-9"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <Button className="w-full p-6 sm:p-0" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <LoaderCircle className="h-5 w-5 animate-spin" />
                Carregando...
              </div>
            ) : (
              'Acessar painel'
            )}
          </Button>
        </form>
      </div>
    </>
  )
}
