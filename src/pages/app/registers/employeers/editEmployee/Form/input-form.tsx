import { SquarePen } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AddressInputProps {
  id: string
  label: string
  registerName: string
  allspace?: string
  defaultValueData?: string
  type?: string
  disabled?: boolean
}

export function InputForm({
  id,
  label,
  registerName,
  allspace,
  defaultValueData,
  type,
  disabled = false
}: AddressInputProps) {
  const { register } = useFormContext()

  return (
    <div className={`space-y-0.5 ${allspace}`}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <SquarePen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          disabled={disabled}
          type={type}
          id={id}
          {...register(registerName)}
          defaultValue={defaultValueData}
        />
      </div>
    </div>
  )
}
