import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import { getEmployeeFunctions } from '@/api/get-functions'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface SelectEmployeeFunctionsProps {
  controlName: string
  isDefaultLabelHidden?: boolean
  space?: string
}

export function SelectEmployeeFunctions({
  controlName,
  isDefaultLabelHidden = false,
  space,
}: SelectEmployeeFunctionsProps) {
  const { control } = useFormContext()
  const { data: employeeFunctions, isLoading } = useQuery({
    queryKey: ['getEmployeeFunctions'],
    queryFn: getEmployeeFunctions,
  })

  return (
    <div className="space-y-0.5">
      <Label className={isDefaultLabelHidden ? 'hidden' : ''}>Função</Label>
      <div className="flex">
        <Controller
          name={controlName}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                className={`w-full ${space} border-r-0 rounded-r-none focus:ring-0 focus:ring-offset-0`}
              >
                <SelectValue placeholder="Seleciona a Função" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {isLoading ? (
                    <SelectItem value="Carregando...">Carregando...</SelectItem>
                  ) : (
                    employeeFunctions?.data &&
                    employeeFunctions?.data.length > 0 &&
                    employeeFunctions.data.map((employeeFunction) => (
                      <SelectItem
                        key={employeeFunction.id}
                        value={String(employeeFunction.id)}
                      >
                        {employeeFunction.nome}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="border-l-0 rounded-l-none">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            Cadastrar Funções
            <Separator />
            <div className="flex items-end justify-between gap-4">
              <div>
                <Label htmlFor="cadastrar">*Função</Label>
                <Input id="cadastrar" className="mt-1 w-64" />
              </div>
              <Button>Cadastrar</Button>
            </div>
            <Separator />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-center w-48">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {employeeFunctions?.data.map((employeeFunction) => (
                  <TableRow key={employeeFunction.id}>
                    <TableCell>{employeeFunction.id}</TableCell>
                    <TableCell>{employeeFunction.nome}</TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button
                        className="h-6 bg-emerald-400 text-white hover:bg-emerald-300"
                        variant={'secondary'}
                      >
                        Editar
                      </Button>
                      <Button className="h-6" variant={'destructive'}>
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
