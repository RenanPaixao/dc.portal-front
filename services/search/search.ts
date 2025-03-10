import { Course } from '@/services/courses/courses'
import { Professor } from '@/services/professors/professors'

interface SearchResponse {
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
  
  const response = await fetch(`/search?search=${search}`)
  return response.json()
}
