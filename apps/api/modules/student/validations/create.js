import * as z from 'zod'

export const createSchema = z.object({
  names: z.string().min(2).max(30),
  lastnames: z.string().min(2).max(30),
  email: z.string().email(),
  ci: z.string().min(2).max(30),
  address: z.string().min(2).max(30),
  currentSession: z.string().min(1).max(30),
  currentCourse: z.string().min(1).max(30),
  placeOfBirth: z.string().min(1).max(40),
  gender: z.enum(['M', 'F']),
  photo: z.string(),
  birthday: z.string(),
})
