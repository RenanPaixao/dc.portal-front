import { SearchInput } from '@/components/SearchInput/SearchInput'

export const Hero = () => (
  <section className='w-full'>
    <div className='container mx-auto'>
      <div className='flex gap-8 py-20 lg:py-40 items-center justify-center flex-col'>
        <div className='flex gap-4 flex-col'>
          <h1 className='text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular'>
            Portal DC
          </h1>
          <p className='text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center'>
            Informações e comentários sobre disciplinas da UFRPE
          </p>
          <SearchInput className={'flex-grow mt-4'} />
        </div>
      </div>
    </div>
  </section>
)
