import { defer, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { invariant } from '@remix-run/router/history'
import { getProfessorById, getProfessorCourses } from '@/services/professors/professors'
import profile from '~/assets/profile.svg'
import { title } from 'radash'
import { Separator } from '~/components/common/Separator/Separator'
import { useState } from 'react'


interface AllProfessorsProps {
  className? : string
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  
  return [
    { title: `${title(data?.professor.name)} | DC Portal` },
    {
      name: "description",
      content: `Informações sobre o professor ${data?.professor.name}, docente da UFRPE.`
    },
  ];
};

// Design in: https://dribbble.com/montyhayton
// https://dribbble.com/shots/25131085-Dark-Mode-Profile-Widget
export async function loader({params}: LoaderFunctionArgs) {
  invariant(params.handle, 'Professor id is required')
  return defer({
    taughtCourses: await getProfessorCourses(params.handle),
    professor: await getProfessorById(params.handle),
  })
}

export default function Professor ({ className }: AllProfessorsProps) {
  const {professor, taughtCourses} = useLoaderData<typeof loader>()
  const [showAllTaughtCourses, setShowAllTaughtCourses] = useState(false)
  
  const getTaughtCourses = () => {
    if (taughtCourses.length > 5 && !showAllTaughtCourses) {
      return taughtCourses.slice(0, 5)
    }
    return taughtCourses
  }
  
  
  return <main className={className}>
    <section className={'max-w-3xl mx-auto border rounded-xl space-y-4 px-24 py-20'}>
      <img className={'size-28 rounded-full'} src={professor.profileImg ?? profile} alt={`imagem de perfil`}/>
      <h1 className={'text-3xl font-semibold'}>{title(professor.name)}</h1>
      <Separator/>
      
      <div>
        <h2 className={'text-xl font-medium text-gray-500'}>Email</h2>
        <p className={'text-gray-700'}>{professor.email}</p>
      </div>
      <Separator/>
      
      <div>
        <h2 className={'text-xl font-medium text-gray-500'}>Histórico de disciplinas</h2>
        <ul className={'pt-2 space-y-1'}>
          {getTaughtCourses().map(course => (
            <li key={course.id} className={'text-gray-700 hover:hover:text-blue-600 transition-colors'}>
              <Link className={'flex justify-between'} to={`/disciplines/${course.id}`}>
                <p>{course.name}</p>
                <p>{course.year}</p>
              </Link>
            </li>
          ))}
        </ul>
        {taughtCourses.length > 5 && !showAllTaughtCourses && (
          <button
            className={'text-blue-600 hover:text-blue-500 transition-colors'}
            onClick={() => setShowAllTaughtCourses(true)}
          >
            + Ver mais...
          </button>
        )}
        {
          (showAllTaughtCourses && taughtCourses.length > 5) &&
          <button
            className={'text-blue-600 hover:text-blue-500 transition-colors'}
            onClick={() => setShowAllTaughtCourses(false)}
          >
            - Ver menos...
          </button>
        }
      </div>
    </section>
  </main>
}
