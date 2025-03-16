import { defer, MetaFunction } from '@remix-run/node'
import { Hero } from '~/components/Hero/Hero'
import { ProfessorsList } from '~/components/ProfessorsList/ProfessorsList'
import { CoursesList } from '~/components/CoursesList/CoursesList'
import { getAllProfessors } from '@/services/professors/professors'
import { Suspense } from 'react'
import { Await, useLoaderData } from '@remix-run/react'
import { getAllCourses } from '@/services/courses/courses'

export const meta: MetaFunction = () => {
  return [
    { title: "Home | DC Portal" },
    {
      name: "description",
      content: "Portal de informação do departamento de computação (DC) da UFRPE."
    },
  ];
};

export const loader = async () => {
  const {professors} = await getAllProfessors()
  
  return defer({
    professors,
    courses: await getAllCourses()
  })
}

export default function Index() {
  const {professors, courses} = useLoaderData<typeof loader>()
  return (
    <main>
      <Hero/>
      <section className={'w-full grid grid-cols-1 gap-4 justify-items-center px-4 py-8 lg:grid-cols-2'}>
        <div className={'container'}>
          <h2
            className={'text-2xl mb-10 md:text-4xl max-w-2xl tracking-tighter text-center font-regular'}>Professores</h2>
          <Suspense fallback={<p>Carregando...</p>}>
            <Await resolve={professors}>
              {(professors) => <ProfessorsList professors={professors}/>}
            </Await>
          </Suspense>
        </div>
        <div className={'container'}>
          <h2
            className={'text-2xl mb-10 md:text-4xl max-w-2xl tracking-tighter text-center font-regular'}>Disciplinas</h2>
          <Suspense fallback={<p>Carregando...</p>}>
            <Await resolve={courses}>
              {courses => <CoursesList courses={courses} />}
            </Await>
          </Suspense>
        </div>
      </section>
    </main>
  );
}
