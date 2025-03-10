
import { useState } from 'react'
import { AutoComplete } from '@/app/components/common/Autocomplete/Autocomplete'
import { debounce } from 'radash'
import { useFetcher } from '@remix-run/react'
import { SearchResponse } from '@/services/search/search'

interface SearchInputProps{
  className?: string
}

// TODO: Redirect to selected item details page
// TODO: Move this component to resources.search.tsx
export const SearchInput = ({ className }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedValue, setSelectedValue] = useState('')
  
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
  
  return <div className={className}>
    <AutoComplete
      isLoading={fetcher.state !== 'idle'}
      placeholder={'Buscar disciplina ou professor'}
      selectedValue={selectedValue}
      onSelectedValueChange={setSelectedValue}
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
