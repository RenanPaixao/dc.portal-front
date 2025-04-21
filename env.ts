import {z} from 'zod'

const envSchema = z.object({
  API_URL: z.string(),
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  SESSION_SECRET: z.string(),
  PUBLIC_URL: z.string(),
})

export const env = envSchema.parse(process.env)
