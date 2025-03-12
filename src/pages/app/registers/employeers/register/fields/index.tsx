import { z } from 'zod'

export const registerNewEmployeeSchema = z.object({
  name: z.string(),
  funcao: z.coerce.number(),
  horasSemanais: z.string(),
  daysOfWeek: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'Selecione pelo menos um dia da semana',
    }),
})

export type RegisterNewEmployeeSchema = z.infer<
  typeof registerNewEmployeeSchema
>
