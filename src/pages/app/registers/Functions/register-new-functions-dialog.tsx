import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogClose, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'

export function RegisterNewFunctionDialog() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(50)

  console.log(step)

  return (
    <DialogContent>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Cadastre uma função</h1>

        <div className="space-y-2">
          <span>
            Etapa <strong className="text-primary">{step}</strong> de{' '}
            <strong className="text-primary">2</strong>
          </span>
          <Progress value={progress} className="w-[100%]"></Progress>
        </div>

        {progress === 50 && (
          <>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Nome</Label>
                <Input placeholder="Digite o nome da função" />
              </div>

              <div className="space-y-1">
                <Label>Descrição</Label>
                <Textarea placeholder="Descreva sobre a função" />
              </div>
            </div>

            <div className="text-right space-x-2">
              <DialogClose asChild>
                <Button variant={'outline'}>Cancelar</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  setProgress(100)
                  setStep(2)
                }}
              >
                Prosseguir
              </Button>
            </div>
          </>
        )}

        {progress === 100 && (
          <div className="space-y-8">
            <span>Selecione os dias da semana de trabalho</span>
            <div className="flex justify-between">
              <div className="flex flex-col items-center space-y-2">
                <Label>SEG</Label>
                <Checkbox />
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Label>TER</Label>
                <Checkbox />
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Label>QUA</Label>
                <Checkbox />
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Label>QUI</Label>
                <Checkbox />
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Label>SEXT</Label>
                <Checkbox />
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Label>SAB</Label>
                <Checkbox />
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Label>DOM</Label>
                <Checkbox />
              </div>
            </div>

            <div className="space-y-4">
              <span>Defina o intervalo de horas trabalhadas</span>
              <div className="flex justify-between items-center">
                <Label className="text-xl font-normal">Horas:</Label>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    step={60}
                    className="text-center dark:bg-zinc-800 dark:text-white"
                  />

                  <Input
                    type="time"
                    step={60}
                    className="text-center dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="text-right space-x-2">
              <Button
                variant={'outline'}
                onClick={() => {
                  setProgress(50)
                  setStep(1)
                }}
              >
                Voltar
              </Button>

              <Button>Prosseguir</Button>
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  )
}
