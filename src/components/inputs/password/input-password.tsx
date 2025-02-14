import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InputPasswordProps {
  label: string
  registerName: string
}

export function InputPassword({ label, registerName }: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)

  const { register } = useFormContext()

  return (
    <div className="space-y-2 relative">
      <Label htmlFor="password">{label}</Label>
      <Input
        className=" text-base pr-10"
        id="password"
        type={showPassword ? 'text' : 'password'}
        {...register(registerName)}
      />

      <button
        type="button"
        className="absolute right-2 top-9"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 text-gray-500" />
        ) : (
          <Eye className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </div>
  )
}
