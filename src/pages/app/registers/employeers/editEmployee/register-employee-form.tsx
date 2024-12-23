import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { addMinutes, formatDate, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

import { getEmployee } from '@/api/get-employee'
import { CalendarSingleDatePicker } from '@/components/calendar-picker-single'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { SelectEmployeeFunctions } from '../../../../../components/employee-function'
import { EditEmployeeInformationTabs } from './edit-employee.-tab-informations'
import { EditEmployeeAddressTab } from './edit-employee-tab-address'
import { InputForm } from './Inputs/input-form'
import { RegisterEmployeeFormSkeleton } from './skeleton/register-employee-form-skeleton'

interface Employee {
  id: string | null
  nome: string | null
  codigo: string | null
  dataAdmissao: string | null
  dataDemissao: string | null
  endereco: string | null
  cep: string | null
  bairro: string | null
  numeroEndereco: string | null
  cidade: string | null
  uf: string | null
  emissaoRG: string | null
  complemento: string | null
  cpf: string | null
  esocial: string | null
  rg: string | null
  orgaoEmissor: string | null
  ufRg: string | null
  dataEmissaoRg: string | null
  pisPasep: string | null
  ctps: string | null
  serieCtps: string | null
  nomePai: string | null
  nomeMae: string | null
  ufNasc: string | null
  nascimentoMunicipio: string | null
  funcao: number | null
  dataNascimento: string | null
}

const editEmployeeSchema = z.object({
  nome: z.string().optional(),
  codigoPonto: z.string().optional(),
  funcao: z.coerce.number().optional(),
  dataAdmissao: z.string().optional(),
  pis: z.string().optional(),
  status: z.string().optional(),
  cep: z.string().optional(),
  endereco: z.string().optional(),
  numeroEndereco: z.string().optional(),
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
  emissaoRg: z.string().optional(),
  serie: z.string().optional(),
  orgaoEmissor: z.string().optional(),
  ufRg: z.string().optional(),
  esocial: z.string().optional(),
  ctps: z.string().optional(),
  dataDemissao: z.string().optional(),
  cpf: z.string().optional(),
})

type EditEmployeeSchema = z.infer<typeof editEmployeeSchema>

export function RegisterEmployeeForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const { id } = useParams()

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
      : ''

    data.dataAdmissao = formatedDate

    console.log(data)
  }

  useEffect(() => {
    const { setValue } = editEmployeeForm

    const fieldsMapping: {
      formField: keyof EditEmployeeSchema
      employeeField: keyof Employee
    }[] = [
      { formField: 'cep', employeeField: 'cep' },
      { formField: 'nome', employeeField: 'nome' },
      { formField: 'codigoPonto', employeeField: 'codigo' },
      { formField: 'endereco', employeeField: 'endereco' },
      { formField: 'bairro', employeeField: 'bairro' },
      { formField: 'cidade', employeeField: 'cidade' },
      { formField: 'complemento', employeeField: 'complemento' },
      { formField: 'numeroEndereco', employeeField: 'numeroEndereco' },
      { formField: 'uf', employeeField: 'uf' },
      { formField: 'cidadeNascimento', employeeField: 'nascimentoMunicipio' },
      { formField: 'ufNascimento', employeeField: 'ufNasc' },
      { formField: 'nomePai', employeeField: 'nomePai' },
      { formField: 'nomeMae', employeeField: 'nomeMae' },
      { formField: 'rg', employeeField: 'rg' },
      { formField: 'serie', employeeField: 'serieCtps' },
      { formField: 'esocial', employeeField: 'esocial' },
      { formField: 'orgaoEmissor', employeeField: 'orgaoEmissor' },
      { formField: 'emissaoRg', employeeField: 'emissaoRG' },
      { formField: 'ufRg', employeeField: 'ufRg' },
      { formField: 'ctps', employeeField: 'ctps' },
      { formField: 'cpf', employeeField: 'cpf' },
      { formField: 'pis', employeeField: 'pisPasep' },
    ]

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
      {employeers &&
        employeers?.data.map((employee) => (
          <div key={employee.id}>
            <div className="m-4 text-base space-y-2">
              <div className="flex justify-between">
                <h1>
                  <span className="font-bold text-lg">Funcionário</span> -{' '}
                  {employee.nome}
                </h1>

                <div className="flex gap-4">
                  <Button variant={'outline'}>Cancelar</Button>
                  <Button>Salvar</Button>
                </div>
              </div>

              <Separator />
            </div>

            <div className="mx-4">
              <FormProvider {...editEmployeeForm}>
                <form
                  onSubmit={editEmployeeForm.handleSubmit(handleEditEmployee)}
                  action=""
                  className="space-y-8"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
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
                  </div>

                  <Separator />

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 ">
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

                    {/* <div className="space-y-0.5">
                      <Label>Status:</Label>
                      <RadioGroup
                        defaultValue="ativado"
                        className="flex flex-col sm:flex-row"
                      >
                        <div className="flex items-center mt-3 space-x-2">
                          <RadioGroupItem value="ativado" id="ativado" />
                          <Label htmlFor="ativado">Ativado</Label>
                        </div>

                        <div className="flex items-center mt-3 space-x-2">
                          <RadioGroupItem value="desativado" id="desativado" />
                          <Label htmlFor="desativado">Desativado</Label>
                        </div>
                      </RadioGroup>
                    </div> */}
                  </div>

                  <Separator />

                  <Tabs defaultValue="endereco" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 ">
                      <TabsTrigger value="endereco">Endereço</TabsTrigger>
                      <TabsTrigger value="dados pessoais">
                        Dados Pessoais
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="endereco" className="mt-6">
                      <EditEmployeeAddressTab />
                    </TabsContent>
                    <TabsContent value="dados pessoais" className="mt-6">
                      <EditEmployeeInformationTabs />
                    </TabsContent>
                  </Tabs>

                  <Separator />

                  <div className="flex gap-4">
                    <Button variant={'outline'}>Cancelar</Button>
                    <Button>Salvar</Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        ))}
    </div>
  )
}
