import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { getFunction } from '@/api/employeeFunctions/get-function'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { FormActions } from '../../employeers/editEmployee/Form/form-actions'
import { FormHeader } from '../../employeers/editEmployee/Form/FormLayout/form-header'
import {
  RegisterNewFunctionsSchema,
  registerNewFunctionsSchema,
} from '../form/form-fields'
import { SelectDaysOfWeek } from '../form/select-days-of-week'

export function EditFunctionForm() {
  const { id } = useParams()

  const navigate = useNavigate()

  const { data: functionName } = useQuery({
    queryKey: ['function'],
    queryFn: () => getFunction({ id: id || '' }),
  })

  const parsedDaysOfWeek = functionName?.data.diasJornada
    ? typeof functionName.data.diasJornada === 'string'
      ? Object.entries(JSON.parse(functionName.data.diasJornada))
          .filter(([, value]) => value === true)
          .map(([day]) => day)
      : Object.entries(functionName.data.diasJornada)
          .filter(([, value]) => value === true)
          .map(([day]) => day)
    : []

  console.log(parsedDaysOfWeek)

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
  })

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
        <div className="flex gap-4 items-end">
          <div className="space-y-0.5">
            <Label>Horas Semanais</Label>
            <Input
              {...editFunctionForm.register('horasSemanais')}
              className="w-48"
            ></Input>
          </div>
          <div className="flex-1">
            <SelectDaysOfWeek />
          </div>
        </div>

        <Textarea {...editFunctionForm.register('descricao')} />

        <FormActions
          registerId={functionName?.data.id}
          isDeleteButtonVisible={true}
          registrationName={functionName?.data.funcao}
          onCancel={() => navigate(-1)}
        />
      </div>
    </FormProvider>
  )
}
