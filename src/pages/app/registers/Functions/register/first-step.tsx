import { ArrowRight } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface FirstStepProps {
  setStep: (step: number) => void
  setProgress: (progress: number) => void
}

interface FirsStepForm {
  nome: string
  descricao: string
}

export function FirstStep({ setProgress, setStep }: FirstStepProps) {
  const { register, watch } = useFormContext<FirsStepForm>()

  const nameValue = watch('nome')

  const isInputNameValid = nameValue === undefined || nameValue?.length < 3

  return (
    <>
      <div className="space-y-2">
        <div className="space-y-1">
          <Label>*Nome</Label>
          <Input placeholder="Digite o nome da função" {...register('nome')} />
        </div>

        <div className="space-y-1">
          <Label>Descrição</Label>
          <Textarea
            placeholder="Descreva sobre a função"
            {...register('descricao')}
          />
        </div>
      </div>

      <div className="flex mt-4">
        <div className="ml-auto flex gap-2">
          <DialogClose asChild>
            <Button variant={'outline'}>Cancelar</Button>
          </DialogClose>
          <Button
            className="space-x-1 "
            onClick={() => {
              setStep(2)
              setProgress(100)
            }}
            disabled={isInputNameValid}
          >
            <span>Prosseguir</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  )
}
