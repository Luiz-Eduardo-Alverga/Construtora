import { LoaderCircle } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button, ButtonProps } from '@/components/ui/button'

interface LoadingButtonProps extends ButtonProps {
  label: string
}

export function LoadingButton({
  label,
  className,
  ...props
}: LoadingButtonProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext()

  return (
    <Button className={className} disabled={isSubmitting} {...props}>
      {isSubmitting ? (
        <div className="flex items-center justify-center gap-2">
          <LoaderCircle className="animate-spin" />
          Carregando...
        </div>
      ) : (
        <span>{label}</span>
      )}
    </Button>
  )
}
