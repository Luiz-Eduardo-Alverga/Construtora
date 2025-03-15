import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { registerNewEmployee } from '@/api/employee/register-new-employee'

import { diasDaSemana } from '../../../employee-functions/register/register-functions-dialog'
import { RegisterNewEmployeeSchema } from '../fields'

export function useHandleRegisterNewEmployee(onClose: () => void) {
  const queryClient = useQueryClient()

  const { mutateAsync: newEmployee } = useMutation({
    mutationFn: registerNewEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Employeers'],
        refetchType: 'active',
      })
    },
  })

  return async function handleRegisterNewEmployee({
    name,
    funcao,
    daysOfWeek,
    horasSemanais,
  }: RegisterNewEmployeeSchema) {
    const diasSelecionados = daysOfWeek

    const diasJornada = diasDaSemana.reduce<Record<string, boolean>>(
      (acc, dia) => {
        acc[dia] = diasSelecionados.includes(dia)
        return acc
      },
      {},
    )

    try {
      await newEmployee({
        dadosfuncionario: {
          nome: name,
          funcao,
          diasJornada,
          horas: horasSemanais,
        },
      })
      toast.success('Funcionário cadastrado com sucesso!', {
        closeButton: true,
      })
      onClose()
    } catch {
      toast.error('Erro ao cadastrar usuário')
    }
  }
}
