import { KeyboardEvent, useState, useEffect, useCallback } from 'react'
import { DrugItem } from '../type'
import { useSearchDrugs, useSpellingSuggestions } from '../apis'
import { useNavigate } from 'react-router-dom'
import { SearchInput, SearchButton, SearchInputContainer, ListItem, ListContainer, FlexContainer, NoResultsError } from './styles'
import { PageContainer } from '../styles'

export const SearchPage = () => {
  const [drugItems, setDrugItems] = useState<DrugItem[]>([])
  const [suggestionItems, setSuggestionItems] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [showNotFoundError, setShowNotFoundError] = useState(false)
  const { searchDrugs, data: searchData } = useSearchDrugs()
  const { spellingSuggestions, data: spellingData } = useSpellingSuggestions()
  const navigate = useNavigate()

  useEffect(() => {
    if (!!searchData && searchData.length > 0) {
      setSuggestionItems([])
      setDrugItems(searchData)
    } else if (searchValue !== '') {
      setDrugItems([])
      spellingSuggestions(searchValue)
    } else {
      setDrugItems([])
      setSuggestionItems([])
    }
  }, [searchData])

  useEffect(() => {
    if (!!spellingData && spellingData.length > 0) {
      setSuggestionItems(spellingData)
    } else {
      setSuggestionItems([])

      if (!!spellingData) {
        setShowNotFoundError(true)
      }
    }
  }, [spellingData])

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchValue)
    }
  }, [searchValue])

  const onSearch = (searchValue: string) => {
    setShowNotFoundError(false)
    searchDrugs(searchValue)
    setSearchValue(searchValue || '')
  }

  const onDrugItemClick = (item: DrugItem) => {
    navigate(`/drugs/${item.rxcui}`, { state: { drug: item } })
  }

  const onSuggestionItemClick = (suggestion: string) => {
    onSearch(suggestion)
    setSearchValue(suggestion)
  }

  return <PageContainer>
    <SearchInputContainer>
      <h2>Search for drugs!</h2>
      <FlexContainer>
        <SearchInput onKeyDown={handleKeyDown} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} type={'search'} placeholder={'Search...'} />
        <SearchButton onClick={() => onSearch(searchValue)}><i className="fa fa-search" /></SearchButton>
      </FlexContainer>
    </SearchInputContainer>

    <ListContainer>
      {drugItems.length > 0 && drugItems.map((item, index) => <ListItem key={index} onClick={() => onDrugItemClick(item)} title={item.name}>{item.name}</ListItem>)}
      {suggestionItems.length > 0 && suggestionItems.map((item, index) => <ListItem key={index} onClick={() => onSuggestionItemClick(item)} title={item}>{item}</ListItem>)}
    </ListContainer>
    {showNotFoundError && <NoResultsError>Sorry, no results found.</NoResultsError>}
  </PageContainer>
}