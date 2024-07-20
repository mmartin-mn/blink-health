import {useLocation} from 'react-router-dom';

export const DrugInfoPage = () => {
  const location = useLocation()

  console.log('HERE bleh', location.state)

  return <div>
    {location.state.drug.name}
  </div>
}