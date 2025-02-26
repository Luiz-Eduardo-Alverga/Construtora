import { z } from 'zod'

export const registerNewFunctionsSchema = z.object({
  nome: z.string(),
  descricao: z.string(),
  horasSemanais: z.string(),
  daysOfWeek: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'Selecione pelo menos um dia da semana',
    }),
})

export type RegisterNewFunctionsSchema = z.infer<
  typeof registerNewFunctionsSchema
>
