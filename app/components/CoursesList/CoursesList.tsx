
import { cn } from '@/lib/utils'
import { Button } from '@/app/components/common/Button/Button'
import { Course } from '@/services/courses/courses'
import { Link } from '@remix-run/react'

interface IProps{
  className?: string
  courses: Course[]
}

export const CoursesList = ({ className, courses }: IProps) => {
  return <div className={cn('bg-[#D6E6FF] text-secondary-foreground p-10 flex flex-col space-y-8 rounded-md', className)}>
    {courses.map(course => (
      <div key={course.id} className={'flex bg-white items-center justify-between gap-3 border p-3 rounded-md border-blue-400'}>
        <div className={'flex items-center gap-5'}>
          <p className={'capitalize line-clamp-1'}>{course.name}</p>
        </div>
        <div className={'flex gap-3'}>
          <div className={'self-stretch border-l border-blue-400 w-[1px] bg-blue-950'} />
          <Button variant={'outline'} asChild>
            <Link to={`/disciplines/${course.id}`}>
              Ver mais...
            </Link>
          </Button>
        </div>
      </div>
    ))}
    <Button asChild>
      <Link prefetch={'intent'} to={'/all-disciplines'}>
        Ver Todos
      </Link>
    </Button>
  </div>
}
