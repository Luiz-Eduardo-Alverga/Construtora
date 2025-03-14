import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { editFunction } from '@/api/employee-functions/edit-function'
import { getFunction } from '@/api/employee-functions/get-function'
import { FormHeader } from '@/components/form/form-header'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useParsedDaysOfWeek } from '@/hooks/use-parsed-days-of-week'
import { useFormStore } from '@/zustand/useSelectedDatesStore'

import { SelectDaysOfWeek } from '../../../../../components/workoad/select-days-of-week'
import {
  RegisterNewFunctionsSchema,
  registerNewFunctionsSchema,
} from '../form/form-fields'
import { diasDaSemana } from '../register/register-functions-dialog'
import { EditFunctionFormSkeleton } from '../skeleton/edit-card-skeleton'
import { EmployeersTable } from './employee-tables'

export function EditFunctionForm() {
  const { id } = useParams()

  const navigate = useNavigate()

  const { setRegisterId, setRegistrationName, setIsDeleteButtonVisible } =
    useFormStore()

  const { data: functionName, isLoading: isLoadingEmployeeFunctions } =
    useQuery({
      queryKey: ['function', id],
      queryFn: () => getFunction({ id: id || '' }),
    })

  const parsedDaysOfWeek = useParsedDaysOfWeek(functionName?.data.diasJornada)

  const editFunctionForm = useForm<RegisterNewFunctionsSchema>({
    resolver: zodResolver(registerNewFunctionsSchema),
    defaultValues: {
      nome: '',
      horasSemanais: '',
      descricao: '',
      daysOfWeek: [],
    },
  })

  const { mutateAsync } = useMutation({
    mutationFn: editFunction,
  })

  async function handleEditFunction(data: RegisterNewFunctionsSchema) {
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
      await mutateAsync({
        id: Number(id),
        dados: {
          descricao: data.descricao,
          funcao: data.nome,
          horas: data.horasSemanais,
          diasJornada,
        },
      })
      navigate(-1)
      toast.success('Função atualizada com sucesso')
    } catch {
      toast.error('Teste')
    }
  }

  useEffect(() => {
    const { setValue } = editFunctionForm

    setValue('nome', functionName?.data.funcao || '')
    setValue('horasSemanais', functionName?.data.horasSemanais || '')
    setValue('descricao', functionName?.data.descricao || '')
    setValue('daysOfWeek', parsedDaysOfWeek)

    setRegisterId(functionName?.data.id || null)
    setRegistrationName(functionName?.data.funcao || null)
    setIsDeleteButtonVisible(true)
  }, [
    editFunctionForm,
    functionName,
    parsedDaysOfWeek,
    setIsDeleteButtonVisible,
    setRegisterId,
    setRegistrationName,
  ])

  return (
    <div>
      {isLoadingEmployeeFunctions ? (
        <EditFunctionFormSkeleton />
      ) : (
        <FormProvider {...editFunctionForm}>
          <form onSubmit={editFunctionForm.handleSubmit(handleEditFunction)}>
            <FormHeader
              visibleItems={['clearInputs']}
              label={'Função'}
              name={functionName?.data.funcao || ''}
            />

            <div className="mx-4 sm:max-w-[450px] sm:mx-auto space-y-4">
              <div className="space-y-0.5">
                <Label>Função</Label>
                <Input {...editFunctionForm.register('nome')} />
              </div>

              <div className="flex flex-col gap-4 items-end">
                <div className="space-y-0.5 w-full">
                  <Label>Horas Semanais</Label>
                  <Input
                    type="number"
                    {...editFunctionForm.register('horasSemanais')}
                  ></Input>
                </div>
                <div className="w-full">
                  <Label>Dias da Semana</Label>
                  <SelectDaysOfWeek />
                </div>
              </div>

              <div className="space-y-0.5">
                <Label>Descrição</Label>
                <Textarea
                  className=" resize-none"
                  {...editFunctionForm.register('descricao')}
                />
              </div>
            </div>
          </form>

          <div className="mx-4">
            <Separator className="mt-8 h-0.5 bg-purple-400" />
            <Separator className="h-1 bg-secondary" />

            <EmployeersTable functionId={id || ''} />
          </div>
        </FormProvider>
      )}
    </div>
  )
}
