import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerNewFunction } from '@/api/register-new-function'
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'

import { FirstStep } from './first-step'
import { SecondStep } from './second-step'

const diasDaSemana = [
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
  'domingo',
]

const registerNewFunctionsSchema = z.object({
  nome: z.string(),
  descricao: z.string(),
  horasSemanais: z.string(),
  daysOfWeek: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'Selecione pelo menos um dia da semana',
    }),
})

type RegisterNewFunctionsSchema = z.infer<typeof registerNewFunctionsSchema>

export function RegisterNewFunctionDialog() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(50)

  const registerNewFunctionForm = useForm<RegisterNewFunctionsSchema>({
    resolver: zodResolver(registerNewFunctionsSchema),
    defaultValues: {
      daysOfWeek: ['segunda', 'terca', 'quarta', 'quinta', 'sexta'],
    },
  })

  const queryClient = useQueryClient()

  const { mutateAsync: register } = useMutation({
    mutationFn: registerNewFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEmployeeFunctions'],
        refetchType: 'active',
      })
    },
  })

  const messageDaysOffWekk =
    registerNewFunctionForm.formState.errors.daysOfWeek?.message

  useEffect(() => {
    if (messageDaysOffWekk) {
      toast.error(messageDaysOffWekk)
    }
  }, [messageDaysOffWekk])

  async function handleRegisterNewFunction(data: RegisterNewFunctionsSchema) {
    const diasSelecionados = data.daysOfWeek

    const horasSemanaisParsed = parseInt(data.horasSemanais)

    if (horasSemanaisParsed < 1) {
      toast.error('Horas Semanais não pode ser menor ou igual a Zero')
      return
    }

    if (horasSemanaisParsed > 44) {
      toast.error(
        'A carga horária máxima semanal permitida para trabalhadores formais no Brasil é de 44 horas',
      )
      return
    }

    const diasJornada = diasDaSemana.reduce<Record<string, boolean>>(
      (acc, dia) => {
        acc[dia] = diasSelecionados.includes(dia)
        return acc
      },
      {},
    )

    try {
      await register({
        funcao: data.nome,
        descricao: data.descricao,
        horasSemanais: data.horasSemanais,
        diasJornada,
      })
      toast.success('Função cadastrada com sucesso!', {
        closeButton: true,
      })

      registerNewFunctionForm.reset()
      setStep(1)
      setProgress(50)
    } catch {
      toast.error('Erro ao cadastrar função')
    }
  }

  return (
    <DialogContent>
      <div className="space-y-4">
        <DialogTitle>
          <h1 className="text-xl font-semibold">Cadastre uma função</h1>
        </DialogTitle>

        <div className="space-y-2">
          <span>
            Etapa <strong className="text-primary">{step}</strong> de{' '}
            <strong className="text-primary">2</strong>
          </span>
          <Progress value={progress} className="w-[100%]"></Progress>
        </div>

        <DialogDescription>
          <FormProvider {...registerNewFunctionForm}>
            <form
              onSubmit={registerNewFunctionForm.handleSubmit(
                handleRegisterNewFunction,
              )}
            >
              {progress === 50 && (
                <FirstStep
                  setProgress={() => setProgress(100)}
                  setStep={() => setStep(2)}
                />
              )}

              {progress === 100 && (
                <SecondStep
                  controlName="daysOfWeek"
                  setProgress={() => setProgress(50)}
                  setStep={() => setStep(1)}
                />
              )}
            </form>
          </FormProvider>
        </DialogDescription>
      </div>
    </DialogContent>
  )
}
