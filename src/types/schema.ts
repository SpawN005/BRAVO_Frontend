import { any, z } from 'zod'

export const FormDataSchema = z.object({
  name: z.string().min(5).max(255).nonempty(),
  country:z.string().min(3).nonempty(),
  city:z.string().min(3).nonempty(),
  logo:z.any(),
  players: z.array(
    z.object({
      firstName: z.string().min(1).max(255),
      lastName: z.string().min(1).max(255),
      email: z.string().email(),
      position: z.enum(['gardien', 'defenseur', 'milieu', 'attaquant']), 

    })
  ),
});