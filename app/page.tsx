import { Button } from '@/components/common/Button/Button'
import { SearchInput } from '@/components/SearchInput/SearchInput'

export default function Home() {
  return (
    <main>
      <section className={'flex flex-col items-center text-center'}>
      <h1 className={'text-4xl text-gray-800 font-extrabold '}>Portal DC</h1>
      <p className={'font-medium text-xl text-gray-500 mt-4 max-w-[400px] md:max-w-none'}>
        Informações e comentários sobre disciplinas da UFRPE
      </p>
      </section>
      <section className={'flex mx-auto gap-2 p-8 max-w-2xl'}>
        <SearchInput className={'flex-grow'}  />
        <Button>Buscar</Button>
      </section>
    </main>
  );
}
