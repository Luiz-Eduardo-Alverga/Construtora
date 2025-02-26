import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { EditEmployeeAddressTab } from './edit-employee-tab-address'
import { EditEmployeeInformationTabs } from './edit-employee-tab-informations'

export function FormTabs() {
  return (
    <Tabs defaultValue="endereco" className="w-full">
      <TabsList className="grid w-full grid-cols-2 ">
        <TabsTrigger value="endereco">Endereço</TabsTrigger>
        <TabsTrigger value="dados pessoais">Dados Pessoais</TabsTrigger>
      </TabsList>
      <TabsContent value="endereco" className="mt-6">
        <EditEmployeeAddressTab />
      </TabsContent>
      <TabsContent value="dados pessoais" className="mt-6">
        <EditEmployeeInformationTabs />
      </TabsContent>
    </Tabs>
  )
}
