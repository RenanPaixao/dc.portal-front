import { Course } from '@/services/courses/courses'
import { Professor } from '@/services/professors/professors'
import { env } from '@/env'

export interface SearchResponse {
  courses: Course[]
  professors: Professor[]
}

export const search = async (search: string): Promise<SearchResponse> => {
  if(!search){
    return {
      courses: [],
      professors: []
    }
  }
  
  const response = await fetch(`${env.API_URL}/search?search=${search}`)
  return response.json()
}
