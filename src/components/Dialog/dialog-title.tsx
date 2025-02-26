import { DialogTitleProps } from '@radix-ui/react-dialog'

import { DialogTitle } from '../ui/dialog'

interface DialogHeaderTitleProps extends DialogTitleProps {
  title: string
}

export function DialogHeaderTitle({ title }: DialogHeaderTitleProps) {
  return (
    <DialogTitle className="text-xl font-semibold">
      <span>{title}</span>
    </DialogTitle>
  )
}
