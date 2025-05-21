import { Options } from '@/services/types'
import { env } from '@/env'
import { Course } from '@/services/courses/courses'

export interface Professor	{
  "id": string,
  "name": string,
  "email": string,
  "profileImg": string | null
}

interface CoursesProfessor {
  "id": string,
  "courseId": string,
  "professorId": string,
  "year": string
}

export interface ProfessorCourse {
  courses: Course
  coursesProfessors: CoursesProfessor
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

export const getProfessorById = async (id: string): Promise<Professor> => {
  const response = await fetch(`${env.API_URL}/professors/${id}`)
  return await response.json()
}

export const getProfessorCourses = async (id: string): Promise<ProfessorCourse[]> => {
  const response = await fetch(`${env.API_URL}/professors/${id}/courses`)
  return await response.json()
}
