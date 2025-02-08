import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { Course } from '@/services/courses/courses'
import { Professor } from '@/services/professors/professors'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
})

interface SearchResponse {
  courses: Course[]
  professors: Professor[]
}

export const useSearch = () => {
  return useMutation({
    retry: 1,
    mutationFn: async (search: string) => {
      if(!search){
        return {
          courses: [],
          professors: []
        }
      }
      
      const { data } = await instance.get<SearchResponse>(`/search?search=${search}`)
      return data
    },
  })
}
