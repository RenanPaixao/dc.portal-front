import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getCourseById } from '@/services/courses/courses'
import { invariant } from '@remix-run/router/history'

interface AllProfessorsProps {
  className? : string
}



export async function loader({params}: LoaderFunctionArgs) {
  invariant(params.handle, 'Course id is required')
  return await getCourseById(params.handle)
}

export default function AllDisciplines ({ className }: AllProfessorsProps) {
  const {name} = useLoaderData<typeof loader>()
  
  return <main className={className}>
    {name}
  </main>
}
