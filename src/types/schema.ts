import { any, z } from 'zod'

export const FormDataSchema = z.object({
  name: z.string().min(1).max(255),
  country:z.string().min(3),
  city:z.string().min(3),
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