import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  username: z.string(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
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
    console.log(data)
    try {
      await authenticate({ username: data.username, password: data.password })
      toast.success('Usuário logado com sucesso')
      navigate('/app')
    } catch {
      toast.error('Credenciais Invalidas')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className=" flex items-center justify-center min-h-screen p-8">
        <div className="bg-white rounded-lg p-8 sm:p-0 w-full sm:w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe seus horários pelo painel do parceiro
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="username">Seu usuário</Label>
              <Input id="username" {...register('username')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>

            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Carregando...
                </div>
              ) : (
                'Acessar painel'
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
