import { useFormContext } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface InsertJustifyProps {
  label: string
}

export function InsertJustify({ label }: InsertJustifyProps) {
  const { register } = useFormContext()

  return (
    <div>
      <Label>Justificativa - {label}</Label>
      <Textarea
        className="mt-1 resize-none"
        {...register('justificativa')}
      ></Textarea>
    </div>
  )
}
