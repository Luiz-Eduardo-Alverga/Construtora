import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { registerNewFunction } from '@/api/employeeFunctions/register-new-function'
import { DialogHeaderTitle } from '@/components/Dialog/dialog-title'
import { ProgressBar } from '@/components/progressBar'
import { DialogContent, DialogDescription } from '@/components/ui/dialog'
import { Workload } from '@/components/workoad'

import {
  RegisterNewFunctionsSchema,
  registerNewFunctionsSchema,
} from '../form/form-fields'
import { FirstStep } from './first-step'

export const diasDaSemana = [
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
  'domingo',
]

interface RegisterNewEmployeeFunction {
  onClose: () => void
}

export function RegisterNewFunctionDialog({
  onClose,
}: RegisterNewEmployeeFunction) {
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
      onClose()
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
        <DialogHeaderTitle title="Cadastre uma função" />

        <ProgressBar value={progress} step={step} progress={progress} />

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
                <Workload
                  registerName="horasSemanais"
                  setProgress={setProgress}
                  setStep={setStep}
                />
              )}
            </form>
          </FormProvider>
        </DialogDescription>
      </div>
    </DialogContent>
  )
}
