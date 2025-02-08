import axios from 'axios'
import { Options } from '@/services/types'
import { useQuery } from '@tanstack/react-query'

export interface Course	{
  "id": string,
  "code": string,
  "name": string,
  "description": string,
  period: number | null
}

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 3000,
})

export const useGetAllCourses = (options?: Options) => {
  return useQuery({
    queryKey: ['courses', options],
    queryFn: async () => {
      const {offset = 0, limit = 10 } = options ?? {}
      const { data } = await instance.get<Course[]>(`/courses?limit=${limit}&offset=${offset}`)
      return data
    },
  })
}
