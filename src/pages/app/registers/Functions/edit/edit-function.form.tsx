import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { getFunction } from '@/api/employeeFunctions/get-function'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { FormHeader } from '../../employeers/editEmployee/Form/FormLayout/form-header'
import {
  RegisterNewFunctionsSchema,
  registerNewFunctionsSchema,
} from '../form/form-fields'
import { SelectDaysOfWeek } from '../form/select-days-of-week'

export function EditFunctionForm() {
  const { id } = useParams()

  const { data: functionName } = useQuery({
    queryKey: ['function'],
    queryFn: () => getFunction({ id: id || '' }),
  })

  const parsedDaysOfWeek = useMemo(() => {
    if (!functionName?.data.diasJornada) return []

    const diasJornada = functionName.data.diasJornada

    if (typeof diasJornada === 'string') {
      return Object.entries(JSON.parse(diasJornada))
        .filter(([, value]) => value === true)
        .map(([day]) => day)
    }

    return Object.entries(diasJornada)
      .filter(([, value]) => value === true)
      .map(([day]) => day)
  }, [functionName?.data.diasJornada])

  const editFunctionForm = useForm<RegisterNewFunctionsSchema>({
    resolver: zodResolver(registerNewFunctionsSchema),
    defaultValues: {
      nome: '',
      horasSemanais: '',
      descricao: '',
      daysOfWeek: [],
    },
  })

  useEffect(() => {
    const { setValue } = editFunctionForm

    setValue('nome', functionName?.data.funcao || '')
    setValue('horasSemanais', functionName?.data.horasSemanais || '')
    setValue('descricao', functionName?.data.descricao || '')
    setValue('daysOfWeek', parsedDaysOfWeek)
  }, [editFunctionForm, functionName, parsedDaysOfWeek])

  return (
    <FormProvider {...editFunctionForm}>
      <FormHeader
        isDeleteButtonVisible={true}
        label={'Função'}
        name={functionName?.data.funcao || ''}
        registrationName={functionName?.data.funcao}
      />

      <div className="mx-4 space-y-4">
        <div className="space-y-0.5">
          <Label>Função</Label>
          <Input {...editFunctionForm.register('nome')} />
        </div>

        <div className="flex flex-col  gap-4 items-end">
          <div className="space-y-0.5 w-full">
            <Label>Horas Semanais</Label>
            <Input {...editFunctionForm.register('horasSemanais')}></Input>
          </div>
          <div className="w-full">
            <Label>Dias da Semana</Label>
            <SelectDaysOfWeek />
          </div>
        </div>

        <div className="space-y-0.5">
          <Label>Descrição</Label>
          <Textarea {...editFunctionForm.register('descricao')} />
        </div>
      </div>
    </FormProvider>
  )
}
