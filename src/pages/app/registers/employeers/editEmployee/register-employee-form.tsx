import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from 'date-fns'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
// Importando o ícone de usuário
import { useParams } from 'react-router-dom'
import { z } from 'zod'

import { getEmployee } from '@/api/get-employee'
import { CalendarSingleDatePicker } from '@/components/calendar-picker-single'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { EditEmployeeInformationTabs } from './edit-employee.-tab-informations'
import { EditEmployeeAddressTab } from './edit-employee-tab-address'
import { SelectEmployeeFunctions } from './Inputs/employee-function'
import { InputForm } from './Inputs/input-form'
import { RegisterEmployeeFormSkeleton } from './skeleton/register-employee-form-skeleton'

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

  return (
    <div className="bg-white dark:bg-black rounded-lg pb-10 m-3 shadow-xl">
      {isLoading && <RegisterEmployeeFormSkeleton />}
      {employeers &&
        employeers?.data.map((employee) => (
          <div key={employee.id}>
            <div className="m-4 text-base space-y-2">
              <h1>Funcionário - {employee.nome}</h1>
              <Separator className="" />
            </div>

            <div className="mx-4 mt-12">
              <FormProvider {...editEmployeeForm}>
                <form
                  onSubmit={editEmployeeForm.handleSubmit(handleEditEmployee)}
                  action=""
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    <InputForm
                      label="Nome"
                      registerName="nome"
                      id="name"
                      allspace="sm:w-[850px]"
                      defaultValueData={employee.nome ?? ''}
                    />

                    <InputForm
                      label="Código ponto"
                      registerName="codigoPonto"
                      id="codigoPonto"
                      allspace="flex-1"
                      defaultValueData={employee.codigo ?? ''}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    <SelectEmployeeFunctions
                      controlName="funcao"
                      space="sm:w-64"
                    />

                    <div className="space-y-0.5 flex-1 relative">
                      <Label>Data Admissão</Label>
                      <Controller
                        name="dataAdmissao"
                        control={editEmployeeForm.control}
                        defaultValue={employee.dataAdmissao || ''}
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
                      defaultValueData={employee.pisPasep ?? ''}
                    />

                    <div className="space-y-0.5">
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
                    </div>
                  </div>

                  <div>
                    <Tabs defaultValue="endereco" className="w-full mb-10">
                      <TabsList className="grid w-full grid-cols-2">
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
                  </div>
                  <Separator />

                  <div className="flex gap-4">
                    <Button size={'lg'}>Salvar</Button>
                    <Button size={'lg'} variant={'outline'}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        ))}
    </div>
  )
}
