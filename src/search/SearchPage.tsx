import { KeyboardEvent, useState, useEffect, useCallback } from 'react'
import { DrugsResponse, DrugItem } from '../type'

export const SearchPage = () => {
  const [searchResult, setSearchResult] = useState<DrugsResponse>()
  const [items, setItems] = useState<DrugItem[]>([])

  useEffect(() => {
    if (!!searchResult && searchResult.drugGroup?.conceptGroup?.length > 0) {
      let newItems: DrugItem[] = []
      searchResult.drugGroup.conceptGroup.forEach((group) => {
        if (!!group.conceptProperties) {
          group.conceptProperties.forEach((concept) => {
            newItems.push({
              rxcui: concept.rxcui,
              name: concept.name,
              synonym: concept.synonym
            })
          })
        }
      })
      setItems(newItems)
    } else {
      setItems([{
        rxcui: 'test',
        name: 'test',
        synonym: 'test'
      }])
      // TODO: Move api call to hook probably
      // const response = await fetch('https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=ambienn')
    }
  }, [searchResult])

  const handleKeyDown = useCallback(async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // TODO: Move api call to hook probably
      const response = await fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${event.currentTarget.value}`)
      const json = await response.json()

      setSearchResult(json)
    }
  }, [])


  return <div>
    Search for drugs!
    <input onKeyDown={handleKeyDown} type={'search'} placeholder={'Search...'} />
    <button><i className="fa fa-search" /></button>
    {items.map((item) => <div>{item.name}</div>)}
  </div>
}