import { useState } from 'react'

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { ConfirmCodeForm } from '../forms/confirm-code-form'
import { ConfirmedCode } from './confirmed-code-dialog'

interface ConfirmCodeDialogProps {
  email: string
}

export function ConfirmCodeDialog({ email }: ConfirmCodeDialogProps) {
  const [isCodeConfirmed, setIsCodeConfirmed] = useState(false)

  return (
    <DialogContent
      className="w-[400px] [&>button]:hidden"
      onInteractOutside={(e) => e.preventDefault()}
      onEscapeKeyDown={(e) => e.preventDefault()}
    >
      {isCodeConfirmed ? (
        <ConfirmedCode />
      ) : (
        <>
          <DialogHeader className="space-y-2">
            <DialogTitle>Confirme seu código</DialogTitle>
            <DialogDescription>
              Enviamos um código de verificação para o seu e-mail{' '}
              <span className="font-semibold">{email}</span>. Insira o código
              abaixo para continuar.
            </DialogDescription>
          </DialogHeader>

          <ConfirmCodeForm
            email={email}
            setIsCodeConfirmed={setIsCodeConfirmed}
          />

          <DialogFooter className="m-auto">
            <span className="text-red-500">
              Não saia da tela até confirmar o código
            </span>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  )
}
