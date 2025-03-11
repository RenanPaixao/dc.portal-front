import { Options } from '@/services/types'
import { env } from '@/env'

export interface Professor	{
  "id": string,
  "name": string,
  "email": string,
  "profileImg": string | null
}

interface GetAllProfessorsResponse {
  count: number | null
  professors: Professor[]
}

interface GetAllProfessorsOptions extends Options{
  count?: boolean
}

export const getAllProfessors = async (options?: GetAllProfessorsOptions): Promise<GetAllProfessorsResponse> => {
  const {offset = 0, limit = 10, count = true } = options ?? {}
  const response= await fetch(`${env.API_URL}/professors?limit=${limit}&offset=${offset}&count=${count}`)
  return await response.json()
}
