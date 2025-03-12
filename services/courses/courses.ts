import { Options } from '@/services/types'
import { env } from '@/env'

export interface Course	{
  "id": string,
  "code": string,
  "name": string,
  "description": string,
  period: number | null
}

export const getAllCourses = async (options?: Options): Promise<Course[]> => {
      const {offset = 0, limit = 10 } = options ?? {}
      const response = await fetch(`${env.API_URL}/courses?limit=${limit}&offset=${offset}`)
      return await response.json()
}
