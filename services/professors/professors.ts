import { Options } from '@/services/types'
import { env } from '@/env'

export interface Professor	{
  "id": string,
  "name": string,
  "email": string,
  "profileImg": string | null
}

export const getAllProfessors = async (options?: Options): Promise<Professor[]> => {
  const {offset = 0, limit = 10 } = options ?? {}
  const response= await fetch(`${env.API_URL}/professors?limit=${limit}&offset=${offset}`)
  return await response.json()
}
