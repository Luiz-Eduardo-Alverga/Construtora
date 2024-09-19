import React, { forwardRef } from 'react'
import InputMask from 'react-input-mask'

interface InputWithMaskProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string | Array<string | RegExp>
  placeholder: string
  className?: string // Adicionando className explicitamente
}

export const InputWithMask = forwardRef<HTMLInputElement, InputWithMaskProps>(
  ({ mask, placeholder, className, ...props }, ref) => {
    return (
      <InputMask
        {...props}
        mask={mask}
        placeholder={placeholder}
        // Usamos ref do InputMask para apontar diretamente ao campo de input subjacente
        inputRef={ref as React.Ref<HTMLInputElement>}
        // Certifique-se de mesclar as classes recebidas
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      />
    )
  },
)

InputWithMask.displayName = 'InputWithMask'
