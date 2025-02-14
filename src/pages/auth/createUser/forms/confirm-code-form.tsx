import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { confirmCode } from '@/api/auth/confirm-code'
import { LoadingButton } from '@/components/buttons/loadingButton/loading-button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { APIError } from '@/interfaces/Error'

const confirmCodeSchema = z.object({
  pin: z.string().min(6, {
    message: 'Digite os 6 dígitos do código',
  }),
})

type ConfirmCodeSchema = z.infer<typeof confirmCodeSchema>

interface ConfirCodeFormProps {
  email: string
  setIsCodeConfirmed: (arg0: boolean) => void
}

export function ConfirmCodeForm({
  email,
  setIsCodeConfirmed,
}: ConfirCodeFormProps) {
  const form = useForm<ConfirmCodeSchema>({
    resolver: zodResolver(confirmCodeSchema),
    defaultValues: {
      pin: '',
    },
  })

  const { mutateAsync: confirmCodeFn } = useMutation({
    mutationFn: confirmCode,
    onSuccess: () => {
      setIsCodeConfirmed(true)
    },
    onError: (error: AxiosError<APIError>) => {
      const errorMessage =
        error.response?.data?.error || 'Ocorreu um erro inesperado'

      toast.error(errorMessage)
    },
  })

  async function handleConfirmCode(data: ConfirmCodeSchema) {
    await confirmCodeFn({ code: data.pin, user: email })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleConfirmCode)}>
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center mt-4">
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot className="h-12 w-12" index={0} />
                    <InputOTPSlot className="h-12 w-12" index={1} />
                    <InputOTPSlot className="h-12 w-12" index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot className="h-12 w-12" index={3} />
                    <InputOTPSlot className="h-12 w-12" index={4} />
                    <InputOTPSlot className="h-12 w-12" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="pt-2">
                Insira os 6 dígitos do código enviado para o seu e-mail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton label="Verificar código" className="w-full mt-6" />
      </form>
    </FormProvider>
  )
}
