import { KeyboardEvent, useState, useEffect, useCallback } from 'react'
import { DrugItem } from '../type'
import { useSearchDrugs, useSpellingSuggestions } from '../apis'
import { useNavigate } from 'react-router-dom'

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
      setShowNotFoundError(true)
    }
  }, [spellingData])

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchValue)
    }
  }, [])

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

  return <div>
    Search for drugs!
    <input onKeyDown={handleKeyDown} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} type={'search'} placeholder={'Search...'} />
    <button onClick={() => onSearch(searchValue)}><i className="fa fa-search" /></button>
    {drugItems.length > 0 && drugItems.map((item, index) => <div key={index} onClick={() => onDrugItemClick(item)}>{item.name}</div>)}
    {suggestionItems.length > 0 && suggestionItems.map((item, index) => <div key={index} onClick={() => onSuggestionItemClick(item)}>{item}</div>)}
    {showNotFoundError && <div>Error Message Goes Here</div>}
  </div>
}