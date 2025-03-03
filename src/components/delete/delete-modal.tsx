import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { Button } from '../ui/button'

interface DeleteModalProps {
  prefixLabel: string
  label: string
  register: string
  deleteFunction: () => void
}

export function DeleteModal({
  deleteFunction,
  label,
  register,
  prefixLabel,
}: DeleteModalProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Essa ação não pode ser desfeita. Isso irá deletar permanentemente{' '}
          {prefixLabel} {label}{' '}
          <span className="font-extrabold">{register}</span>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button asChild variant={'ghost'}>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </Button>

        <Button asChild variant={'destructive'} onClick={deleteFunction}>
          <AlertDialogAction>Continuar</AlertDialogAction>
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
