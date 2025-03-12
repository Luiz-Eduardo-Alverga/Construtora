import { Copy } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function InviteUserModal() {
  const [copied, setCopied] = useState(false)
  const link = 'https://ponto-one.vercel.app/cadastrar/usuario'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)

      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Compartilhe o Link</DialogTitle>
        <DialogDescription>
          Qualquer um que tenha acesso a esse Link poderá solicitar acesso ao
          sistema.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input id="link" value={link} readOnly />
        </div>
        <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
          <span className="sr-only">Copy</span>
          <Copy />
        </Button>
      </div>
      {copied && (
        <p className="text-green-500 text-center text-sm mt-2">Link copiado!</p>
      )}
    </>
  )
}
