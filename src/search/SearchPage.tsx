import { KeyboardEvent, useState, useEffect, useCallback } from 'react'
import { DrugItem } from '../type'
import { useSearchDrugs } from '../apis'

export const SearchPage = () => {
  const [items, setItems] = useState<DrugItem[]>([])
  const { searchDrugs, data } = useSearchDrugs()

  useEffect(() => {
    if (!!data && data.length > 0) {
      setItems(data)
    } else {
      setItems([{
        rxcui: 'test',
        name: 'test',
        synonym: 'test'
      }])
      // TODO: Move api call to hook probably
      // const response = await fetch('https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=ambienn')
    }
  }, [data])

  const handleKeyDown = useCallback(async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchDrugs(event.currentTarget.value)
    }
  }, [])


  return <div>
    Search for drugs!
    <input onKeyDown={handleKeyDown} type={'search'} placeholder={'Search...'} />
    <button><i className="fa fa-search" /></button>
    {items.map((item, index) => <div key={index}>{item.name}</div>)}
  </div>
}