import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { getEmployee } from '@/api/get-employee'

export function RegisterEmployeeForm() {
  const { id } = useParams()

  const { data: result } = useQuery({
    queryKey: ['employeeDetails', id],
    queryFn: () => getEmployee({ id }),
  })

  // Verifica se o resultado é um array e se tem pelo menos um item
  const employee = result && result.length > 0 ? result[0] : null

  return (
    <div>
      {/* Exibe o nome do funcionário se houver dados */}
      {employee ? (
        <h1>{employee.Nome}</h1>
      ) : (
        <h1>Funcionário não encontrado</h1>
      )}
      <h1>Teste</h1>
    </div>
  )
}
