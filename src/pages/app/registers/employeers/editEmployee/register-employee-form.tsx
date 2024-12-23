import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { addMinutes, formatDate, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import { getEmployee } from '@/api/get-employee'
import { CalendarSingleDatePicker } from '@/components/calendar-picker-single'
import { Label } from '@/components/ui/label'

import { Separator } from '@/components/ui/separator'

import { SelectEmployeeFunctions } from '../../../../../components/employee-function'
import { InputForm } from './Form/input-form'
import { RegisterEmployeeFormSkeleton } from './skeleton/register-employee-form-skeleton'
import { FormActions } from './Form/form-actions'
import { FormTabs } from './Form/form-tabs'
import { FormCheckbox } from './Form/form-checkbox'
import { FormContainer } from './Form/form-container'
import { fieldsMapping } from './Form/FieldsForm/fields-mapping'

const editEmployeeSchema = z.object({
  nome: z.string().optional(),
  codigoPonto: z.string().optional(),
  funcao: z.coerce.number().optional(),
  dataAdmissao: z.string().optional(),
  pis: z.string().optional(),
  status: z.string().optional(),
  cep: z.string().optional(),
  endereco: z.string().optional(),
  numeroEndereco: z.number().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  complemento: z.string().optional(),
  cidadeNascimento: z.string().optional(),
  ufNascimento: z.string().optional(),
  nomePai: z.string().optional(),
  nomeMae: z.string().optional(),
  dataNascimento: z.string().optional(),
  rg: z.string().optional(),
  serie: z.string().optional(),
  orgaoEmissor: z.string().optional(),
  ufRg: z.string().optional(),
  esocial: z.string().optional(),
  ctps: z.string().optional(),
  dataDemissao: z.string().optional(),
  cpf: z.string().optional(),
})

export type EditEmployeeSchema = z.infer<typeof editEmployeeSchema>

export function RegisterEmployeeForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const { id } = useParams()
  const navigate = useNavigate()

  const editEmployeeForm = useForm<EditEmployeeSchema>({
    resolver: zodResolver(editEmployeeSchema),
  })

  const { data: employeers, isLoading } = useQuery({
    queryKey: ['EmployeeDetails', id],
    queryFn: () => getEmployee({ id }),
  })

  function handleEditEmployee(data: EditEmployeeSchema) {
    const formatedDate = selectedDate
      ? formatDate(selectedDate, 'yyyy-MM-dd')
      : '';
  
    data.dataAdmissao = formatedDate;
    

    if (employeers?.data[0]) {
      const employeeFromApi = employeers.data[0];
       
      const changedFields = fieldsMapping.reduce<Record<string, any>>(
        (acc, { formField, employeeField }) => {
          const formValue = data[formField];
          const apiValue = employeeFromApi[employeeField];       
          
          if (formValue !== apiValue) {
            acc[formField] = formValue;
          }
  
          return acc;
        },
        {}
      );

      if(data.dataAdmissao !== employeeFromApi.dataAdmissao) {
        changedFields.dataAdmissao = data.dataAdmissao
      }
  
      console.log('Campos alterados:', changedFields);
      
    }
  }
  
  useEffect(() => {
    const { setValue } = editEmployeeForm

    employeers?.data.forEach((employee) => {
      fieldsMapping.forEach(({ formField, employeeField }) => {
        const value = employee[employeeField] ?? ''
        setValue(formField, value)
      })
    })

    if (employeers) {
      const employee = employeers.data[0]
      if (employee.dataAdmissao) {
        const localDate = addMinutes(
          parseISO(employee.dataAdmissao),
          new Date().getTimezoneOffset(),
        )
        setSelectedDate(localDate)
      }
    }
  }, [editEmployeeForm, employeers, employeers?.data])

  return (
    <div>
      {isLoading && <RegisterEmployeeFormSkeleton />}
      <FormProvider {...editEmployeeForm}>
      <form onSubmit={editEmployeeForm.handleSubmit(handleEditEmployee)}>
        {employeers &&
          employeers?.data.map((employee) => (
            <div key={employee.id}>
              <div className="m-4 text-base space-y-2">
                <div className="flex justify-between">
                  <h1>
                    <span className="font-bold text-lg">Funcionário</span> -{' '}
                    {employee.nome}
                  </h1>

                  <FormActions onCancel={() => navigate(-1)} cancelLabel='Cancelar' submitLabel='Salvar'/>
                </div>

                <Separator />
              </div>

              <div className="mx-4 space-y-6 ">
                
                
                    <FormContainer>
                      <InputForm
                        label="Nome"
                        registerName="nome"
                        id="name"
                        allspace="sm:w-[850px]"
                      />

                      <InputForm
                        label="Código ponto"
                        registerName="codigoPonto"
                        id="codigoPonto"
                        allspace="flex-1"
                      />
                    </FormContainer>

                    <Separator />

                    <FormContainer>
                      <SelectEmployeeFunctions
                        controlName="funcao"
                        space="sm:w-64"
                        defaultValue={employee.funcao}
                      />

                      <div className="space-y-0.5 flex-1 relative">
                        <Label>Data Admissão</Label>
                        <Controller
                          name="dataAdmissao"
                          control={editEmployeeForm.control}
                          render={({ field }) => (
                            <CalendarSingleDatePicker
                              date={selectedDate}
                              setDate={setSelectedDate}
                              {...field}
                            />
                          )}
                        />
                      </div>

                      <InputForm
                        label="PIS"
                        registerName="pis"
                        id="pis"
                        allspace="flex-1"
                      />

                      <FormCheckbox />
                    </FormContainer>

                    <Separator />

                    <FormTabs />

                    <Separator />

                    <FormActions onCancel={() => navigate(-1)} cancelLabel='Cancelar' submitLabel='Salvar'/>
                
                
              </div>
            </div>
          ))}
        </form>
        </FormProvider>
    </div>
  )
}
