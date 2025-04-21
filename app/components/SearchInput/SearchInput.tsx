
import { useState } from 'react'
import { AutoComplete } from '@/app/components/common/Autocomplete/Autocomplete'
import { debounce } from 'radash'
import { useFetcher, useNavigate } from '@remix-run/react'
import { SearchResponse } from '@/services/search/search'

interface SearchInputProps{
  className?: string
}

export const SearchInput = ({ className }: SearchInputProps) => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  
  const fetcher = useFetcher<SearchResponse>()
  const transformDataIntoOptions = () => {
    const data = fetcher.data
    if (!data || searchValue === '') {
      return []
    }
    
    return [...data.courses, ...data.professors].map(item => ({
      value: item.id,
      label: item.name
    }))
  }
  
  const redirectToItemPage = (value: string) => {
    const isProfessor = fetcher.data?.professors.some(item => item.id === value)
    const isCourse = fetcher.data?.courses.some(item => item.id === value)
    
    if (isProfessor) {
      navigate(`/professors/${value}`)
      return
    }
    
    if(isCourse) {
      navigate(`/disciplines/${value}`)
      return
    }
    
    throw new Error(`Could not find option ${value}`)
  }
  
  return <div className={className}>
    <AutoComplete
      isLoading={fetcher.state !== 'idle'}
      placeholder={'Buscar disciplina ou professor'}
      selectedValue={''}
      onSelectedValueChange={(value) => {
        redirectToItemPage(value)
      }}
      searchValue={searchValue}
      onSearchValueChange={value => {
        setSearchValue(value)
        const debouncedSearch = debounce({ delay: 500 }, fetcher.submit)
        debouncedSearch({ search: value }, {method: 'get', action: '/resources/search'})
      }}
      items={transformDataIntoOptions()}
    />
  </div>
}
