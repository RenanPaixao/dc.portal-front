import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export interface Professor	{
  "id": string,
  "name": string,
  "email": string,
  "profileImg": string | null
}

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 3000,
})

interface Options {
  offset?: number
  limit?: number
}

export const useGetAllProfessors = (options?: Options) => {
  return useQuery({
    queryKey: ['professors', options],
    queryFn: async () => {
      const {offset = 0, limit = 10 } = options ?? {}
      const { data } = await instance.get<Professor[]>(`/professors?limit=${limit}&offset=${offset}`)
      return data
    },
  })
}
