
import { cn } from '@/lib/utils'
import { Button } from '@/app/components/common/Button/Button'
import { Professor } from '@/services/professors/professors'
import { Link } from '@remix-run/react'

interface IProps{
  className?: string
  professors: Professor[]
}

export function ProfessorsList ({professors, className}: IProps) {
  return <div className={cn('bg-[#D6E6FF] text-secondary-foreground p-10 flex flex-col space-y-8 rounded-md', className)}>
        {professors?.map(professor => (
            <div key={professor.id} className={'flex bg-white items-center justify-between gap-3 border p-3 rounded-md border-blue-400'}>
              <div className={'flex items-center gap-5'}>
                <p className={'capitalize line-clamp-1'}>{professor?.name}</p>
              </div>
              <div className={'flex gap-3'}>
                <div className={'self-stretch border-l border-blue-400 w-[1px] bg-blue-950'} />
                <Button variant={'outline'}>Ver mais...</Button>
              </div>
            </div>
          ))}
        <Button asChild>
          <Link to={'/all-professors'}>
            Ver Todos
          </Link>
        </Button>
      </div>
}
