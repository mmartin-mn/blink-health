import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HeaderContainer, TransparentButton, NavContainer } from './styles'

export const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!!location && !!location.pathname) {
      if (location.pathname === '/drugs/search') {
        setTitle('Drug Search')
      } else {
        setTitle('Drug Details')
      }
    }
  }, [location])

  const onHomeClick = () => {
    navigate('/drugs/search')
  }

  return <HeaderContainer>
    <NavContainer>
      <TransparentButton onClick={onHomeClick}>
        <h2>Blink Takehome</h2>
      </TransparentButton>
    </NavContainer>
    <TransparentButton>
      <h2>{title}</h2>
    </TransparentButton>
  </HeaderContainer>
}