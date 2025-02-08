import { Hero } from '@/components/Hero/Hero'
import { ProfessorsList } from '@/components/ProfessorsList/ProfessorsList'
import { CoursesList } from '@/components/CoursesList/CoursesList'

export default function Home() {
  return (
    <main>
      <Hero />
      <section className={'w-full grid grid-cols-2 gap-4 px-4 py-8'}>
        <div className={'container'}>
          <h2 className={'text-2xl mb-10 md:text-4xl max-w-2xl tracking-tighter text-center font-regular'}>Professores</h2>
          <ProfessorsList />
        </div>
        <div className={'container'}>
          <h2 className={'text-2xl mb-10 md:text-4xl max-w-2xl tracking-tighter text-center font-regular'}>Disciplinas</h2>
          <CoursesList />
        </div>
      </section>
    </main>
  )
}
