import { useQuery } from '@tanstack/react-query'
import { CalendarDays, SquarePen, User } from 'lucide-react'
// Importando o ícone de usuário
import { useParams } from 'react-router-dom'

import { getEmployee } from '@/api/get-employee'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { EditEmployeeAddressTab } from './edit-employee-tab-address'

export function RegisterEmployeeForm() {
  const { id } = useParams()

  const { data: employeers } = useQuery({
    queryKey: ['EmployeeDetails', id],
    queryFn: () => getEmployee({ id }),
  })

  return (
    <div className="bg-white dark:bg-gray-950 rounded-sm pb-10 m-3 shadow-lg">
      {employeers?.map((employee) => (
        <div key={employee.id}>
          <div className="m-4 text-base space-y-2">
            <h1>Funcionário - {employee.nome}</h1>
            <Separator className="" />
          </div>

          <div className="mx-4 mt-12">
            <form action="" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <div className="space-y-0.5 relative">
                  <Label htmlFor="name">*Nome</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="name"
                      placeholder={employee.nome ?? 'Informa o nome'}
                      className="w-full sm:w-[850px]"
                    />
                  </div>
                </div>

                <div className="space-y-0.5 flex-1 relative">
                  <Label htmlFor="codigoPonto">Código ponto</Label>
                  <div className="relative">
                    <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder={employee.Codigo ?? ''}
                      id="codigoPonto"
                      className=""
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <div className="space-y-0.5">
                  <Label>*Função</Label>
                  <Select>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="Seleciona a Função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Pedreiro">Pedreiro</SelectItem>
                        <SelectItem value="Mestre de Obra">
                          Mestre de Obra
                        </SelectItem>
                        <SelectItem value="Pintor">Pintor</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-0.5 flex-1 relative">
                  <Label htmlFor="codigoPonto">Data Admissão</Label>
                  <div className="relative">
                    <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input id="codigoPonto" className="" />
                  </div>
                </div>

                <div className="space-y-0.5 flex-1 relative">
                  <Label htmlFor="codigoPonto">PIS</Label>
                  <div className="relative">
                    <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input id="codigoPonto" className="" />
                  </div>
                </div>

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
                  <TabsContent value="endereco">
                    <EditEmployeeAddressTab />
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
          </div>
        </div>
      ))}
    </div>
  )
}
