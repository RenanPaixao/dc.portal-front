import { LoaderFunctionArgs } from '@remix-run/node'
import {
  Pagination,
  PaginationContent,
  PaginationItem, PaginationLink,
  PaginationNext, PaginationPrevious
} from '~/components/common/Pagination/Pagination'
import { useLoaderData, useNavigate } from '@remix-run/react'
import { cn } from '@/lib/utils'
import { getAllCourses } from '@/services/courses/courses'
import { FeatureBox } from '~/components/common/FeatureBox'
import { title } from 'radash'
import { BookCopy } from 'lucide-react'

// TODO: Investigate why is being possible to advance to the next page when there are no more items
interface AllDisciplinesProps {
  className? : string
}

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const limit = 12
  
  const data = await getAllCourses({
    limit: parseInt(url.searchParams.get('limit') ?? `${limit}`),
    offset: parseInt(url.searchParams.get('offset') ?? '0')
  })
  
  const totalPages = Math.ceil((data.count ?? 10) / 10)
  
  return {
    currentPage: parseInt(url.searchParams.get('page') ?? '1'),
    totalPages,
    limit,
    courses: data.courses
  }
}

export default function AllDisciplines ({ className }: AllDisciplinesProps) {
  const {currentPage, limit, courses, totalPages} = useLoaderData<typeof loader>()
  const navigate = useNavigate()
  
  const buildSearchParam = (page: number) => {
    const offset = (page - 1) * limit
    return `?page=${page}&limit=${limit}&offset=${offset}`
  }
  
  return <main className={className}>
    <section>
      <div className="bg-gradient-to-r from-blue-200 to-cyan-200 px-8 pb-32 pt-16">
          <h1 className={'text-3xl text-white bg-blue-950 max-w-fit mx-auto rounded-xl mb-16 p-4 py-2 md:text-4xl tracking-tighter text-center font-regular'}>Disciplinas</h1>
        <div className="container !pt-0 mx-auto px-4 lg:px-8 lg:py-32 xl:max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {
              courses.map(course => (
                <FeatureBox
                  onClick={() => navigate(`/disciplines/${course.id}`)}
                  key={course.id}
                  name={title(course.name)}
                  description={course.description}
                  icon={<BookCopy className={'mb-5 inline-block size-12 text-blue-600 dark:text-blue-500'}/>}/>
              ))
            }
          </div>
        </div>
      </div>
      
      <Pagination className={'bottom-0 right-0 fixed  bg-white py-6 shadow-[rgba(0,0,15,0.1)_0px_-2px_1px_0px]'}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              replace
              className={cn({ 'opacity-50 pointer-events-none': currentPage === 1 })}
              href={buildSearchParam(currentPage - 1)}
            />
          </PaginationItem>
          <PaginationItem className={'pointer-events-none'}>
            <PaginationLink href="#" isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              replace
              className={cn({ 'opacity-50 pointer-events-none': currentPage === totalPages })}
              href={buildSearchParam(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  </main>
}
