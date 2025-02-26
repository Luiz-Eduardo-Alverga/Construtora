import { GalleryVerticalEnd } from 'lucide-react'
import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'

import { ConfirmCodeDialog } from './dialog/confirm-code-dialog'
import { SendEmailForm } from './forms/send-email-form'

export function Authenticate() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          ControlTek
        </a>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Bem Vindo</CardTitle>

              <CardDescription>
                Crie sua conta preencheendo as informações abaixo
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {isDialogOpen ? (
                  <ConfirmCodeDialog email={email} />
                ) : (
                  <SendEmailForm
                    setEmail={setEmail}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                )}
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
