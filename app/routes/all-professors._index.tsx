import { UserCard } from '~/components/common/UserCard/UserCard'
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { getAllProfessors } from '@/services/professors/professors'
import {
  Pagination,
  PaginationContent,
  PaginationItem, PaginationLink,
  PaginationNext, PaginationPrevious
} from '~/components/common/Pagination/Pagination'
import { useLoaderData } from '@remix-run/react'
import { title } from 'radash'
import { cn } from '@/lib/utils'

// TODO: expand the list container to fill the screen when we have only few professors on last page
interface AllProfessorsProps {
  className ? : string
}

export const meta: MetaFunction = () => {
  return [
    { title: "Professores | DC Portal" },
    {
      name: "description",
      content: "Todos os professores do departamento de computação da UFRPE (DC)."
    },
  ];
};

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const limit = 12
  
  const data = await getAllProfessors({
    limit: parseInt(url.searchParams.get('limit') ?? `${limit}`),
    offset: parseInt(url.searchParams.get('offset') ?? '0')
  })
  
  const totalPages = Math.ceil((data.count ?? limit) / limit)
  return {
    currentPage: parseInt(url.searchParams.get('page') ?? '1'),
    totalPages,
    limit,
    professors: data.professors
  }
}

export default function AllProfessors ({ className }: AllProfessorsProps) {
  const {currentPage, limit, totalPages, professors} = useLoaderData<typeof loader>()
  
  const buildSearchParam = (page: number) => {
    const offset = (page - 1) * limit
    return `?page=${page}&limit=${limit}&offset=${offset}`
  }
  return <main className={'bg-gradient-to-r from-blue-200 to-cyan-200' + ' ' + className} >
    <section className={'p-8 pb-32'}>
      <h1 className={'text-3xl text-white bg-blue-950 max-w-fit mx-auto rounded-xl mb-16 p-4 py-2 md:text-4xl tracking-tighter text-center font-regular'}>Professores</h1>
      <div className={'grid gap-8 grid-cols-4 mt-8'}>
        {professors.map((professor) => (
          <UserCard
            id={professor.id}
            key={professor.id}
            image={professor.profileImg ?? undefined}
            email={professor.email}
            name={title(professor.name)}
          />
        ))}
      </div>
        <Pagination className={'bottom-0 right-0 fixed  bg-white py-6 shadow-[rgba(0,0,15,0.1)_0px_-2px_1px_0px]'}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious replace className={cn({'opacity-50 pointer-events-none': currentPage === 1})} href={buildSearchParam(currentPage - 1)} />
            </PaginationItem>
            <PaginationItem className={'pointer-events-none'}>
              <PaginationLink href="#" isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext replace className={cn({'opacity-50 pointer-events-none': currentPage === totalPages})} href={buildSearchParam(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
    </section>
  </main>
}
