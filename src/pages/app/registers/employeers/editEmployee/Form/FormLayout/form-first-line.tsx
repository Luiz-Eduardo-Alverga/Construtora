import { InputForm } from '../input-form'
import { FormContainer } from './form-container'

export function FormHeaderFirstLine() {
  return (
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
  )
}
