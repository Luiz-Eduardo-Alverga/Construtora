/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { registerNewEmployee } from '@/api/employee/register-new-employee'
import { DialogHeaderTitle } from '@/components/dialogs/dialog-title'
import { ProgressBar } from '@/components/progress-bar'
import { DialogContent, DialogDescription } from '@/components/ui/dialog'
import { Workload } from '@/components/workoad'

import { diasDaSemana } from '../../employee-functions/register/register-functions-dialog'
import { RegisterNewEmployeeSchema, registerNewEmployeeSchema } from './fields'
import { FirstStep } from './first-step'
import { useHandleRegisterNewEmployee } from './hooks/use-handle-register-new-employee'

interface RegisterNewEmployeeProps {
  onClose: () => void
}

export function RegisterNewEmployeeDialog({
  onClose,
}: RegisterNewEmployeeProps) {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(50)

  const queryClient = useQueryClient()

  const registerEmployeeForm = useForm<RegisterNewEmployeeSchema>({
    resolver: zodResolver(registerNewEmployeeSchema),
    defaultValues: {
      daysOfWeek: [],
    },
  })

  const { mutateAsync: newEmployee } = useMutation({
    mutationFn: registerNewEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Employeers'],
        refetchType: 'active',
      })
    },
  })

  const messageDaysOffWekk =
    registerEmployeeForm.formState.errors.daysOfWeek?.message

  useEffect(() => {
    if (messageDaysOffWekk) {
      toast.error(messageDaysOffWekk)
    }
  }, [messageDaysOffWekk])

  // async function handleRegisterNewEmployee({
  //   name,
  //   funcao,
  //   daysOfWeek,
  //   horasSemanais,
  // }: RegisterNewEmployeeSchema) {
  //   const diasSelecionados = daysOfWeek

  //   const diasJornada = diasDaSemana.reduce<Record<string, boolean>>(
  //     (acc, dia) => {
  //       acc[dia] = diasSelecionados.includes(dia)
  //       return acc
  //     },
  //     {},
  //   )

  //   try {
  //     await newEmployee({
  //       dadosfuncionario: {
  //         nome: name,
  //         funcao,
  //         diasJornada,
  //         horas: horasSemanais,
  //       },
  //     })
  //     toast.success('Funcionário cadastrado com sucesso!', {
  //       closeButton: true,
  //     })
  //     onClose()
  //   } catch {
  //     toast.error('Erro ao cadastrar usuario')
  //   }
  // }

  const handleRegisterNewEmployee = useHandleRegisterNewEmployee(onClose)

  return (
    <DialogContent>
      <div className="space-y-4">
        <DialogHeaderTitle title="Cadastre um novo funcionário" />

        <ProgressBar progress={progress} step={step} />

        <DialogDescription>
          <FormProvider {...registerEmployeeForm}>
            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={registerEmployeeForm.handleSubmit(
                handleRegisterNewEmployee,
              )}
            >
              {progress === 50 && (
                <FirstStep
                  onClose={onClose}
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
