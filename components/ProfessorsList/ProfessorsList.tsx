'use client'
import { useGetAllProfessors } from '@/services/professors/professors'
import { cn } from '@/lib/utils'
import { Button } from '@/components/common/Button/Button'

interface IProps{
  className?: string
}

export const ProfessorsList = ({ className }: IProps) => {
  const {data, isLoading, isError} = useGetAllProfessors()
  
  return <div className={cn('bg-[#D6E6FF] text-secondary-foreground p-10 flex flex-col space-y-8 rounded-md', className)}>
    {isLoading && <div>Carregando...</div>}
    {isError && <div>Ocorreu um erro ao carregar a lista de professores</div>}
    {data && data.map((professor) => (
      <div key={professor.id} className={'flex bg-white items-center justify-between gap-3 border p-3 rounded-md border-blue-400'}>
        <div className={'flex items-center gap-5'}>
          <p className={'capitalize line-clamp-1'}>{professor.name}</p>
        </div>
        <div className={'flex gap-3'}>
          <div className={'self-stretch border-l border-blue-400 w-[1px] bg-blue-950'}/>
        <Button variant={'outline'}>Ver perfil</Button>
        </div>
      </div>
    ))}
    <Button>Ver Todos</Button>
  </div>
}
