import { toast } from 'sonner'

interface ValidateNotNullableFieldsProps {
  nome: string | undefined
  funcao: number | undefined
}

export function validateNotNullableFields({
  funcao,
  nome,
}: ValidateNotNullableFieldsProps): boolean {
  if (nome === '') {
    toast.info('Preencha o nome do funcionário')
    return false
  }

  if (nome && nome.length < 3) {
    toast.info('Nome do funcionário deve ter mais que 2 caracteres')
    return false
  }

  if (funcao === 0) {
    toast.info('Preencha a Função do Funcionário')
    return false
  }

  return true
}
