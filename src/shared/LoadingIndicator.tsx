import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const LoadingAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Loader = styled.div<{ width: number, borderWidth: number }>`
  border: ${props => props.borderWidth}px solid #f3f3f3;
  border-top: ${props => props.borderWidth}px solid black; 
  border-radius: 50%;
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  animation-name: ${LoadingAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`

type LoadingIndicatorProps = {
  size?: 'small' | 'large'
}

export const Loadingindicator = ({ size = 'small' }: LoadingIndicatorProps) => {
  const [width, setWidth] = useState<number>(120)
  const [borderWidth, setBorderWidth] = useState<number>(16)

  useEffect(() => {
    if (size === 'large') {
      setWidth(120)
      setBorderWidth(16)
    } else {
      setWidth(15)
      setBorderWidth(3)
    }
  }, [size])

  return <Loader width={width} borderWidth={borderWidth} />
}