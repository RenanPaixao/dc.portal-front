import { Options } from '@/services/types'
import { env } from '@/env'

export interface Course	{
  "id": string,
  "code": string,
  "name": string,
  "description": string,
  period: number | null
}

interface AllCoursesResponse {
  courses: Course[],
  count: number | null
}

interface AllCoursesOptions extends Options {
  count?: boolean
}

export const getAllCourses = async (options?: AllCoursesOptions): Promise<AllCoursesResponse> => {
    const {offset = 0, limit = 10, count = true } = options ?? {}
    const response = await fetch(`${env.API_URL}/courses?limit=${limit}&offset=${offset}&count=${count}`)
    return await response.json()
}

export const getCourseById = async (id: string): Promise<Course> => {
    const response = await fetch(`${env.API_URL}/courses/${id}`)
    return await response.json()
}
