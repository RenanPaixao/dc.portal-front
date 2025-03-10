
import { useState } from 'react'
import { AutoComplete } from '@/app/components/common/Autocomplete/Autocomplete'
import { useSearch } from '@/services/search/search'
import { debounce } from 'radash'

interface IProps{
  className?: string
}

export const SearchInput = ({ className }: IProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedValue, setSelectedValue] = useState('')

  const { data, mutate, isPending } = useSearch()

  const transformDataIntoOptions = () => {
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
      isLoading={isPending}
      placeholder={'Buscar disciplina ou professor'}
      selectedValue={selectedValue}
      onSelectedValueChange={setSelectedValue}
      searchValue={searchValue}
      onSearchValueChange={value => {
        setSearchValue(value)
        const debouncedMutate = debounce({ delay: 500 }, mutate)
        debouncedMutate(value)
      }}
      items={transformDataIntoOptions()}
    />
  </div>
}
