import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DrugItem } from '../type';
import { PageContainer } from '../styles';
import { Header, Flex, Text, FlexColumn, LoadingContainer } from './styles';
import { useGetNDCs } from '../apis';
import { Loadingindicator } from '../shared/LoadingIndicator';

export const DrugInfoPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [drugInfo, setDrugInfo] = useState<DrugItem>()
  const [ndcs, setNDCs] = useState<string[]>([])
  const { getNDCs, data, loading } = useGetNDCs()

  useEffect(() => {
    if (!location.state) {
      navigate('/drugs/search')
    } else {
      setDrugInfo(location.state.drug)
    }
  }, [location.state])

  useEffect(() => {
    if (!!drugInfo) {
      getNDCs(drugInfo.rxcui)
    }
  }, [drugInfo])

  useEffect(() => {
    if (!!data) {
      setNDCs(data)
    }
  }, [data])

  return <PageContainer style={{ display: 'flex', justifyContent: 'center'}}>
    <FlexColumn>
      <Flex>
        <div>
          <Header>{drugInfo?.name}</Header>
          <FlexColumn>
            <Text>ID: {drugInfo?.rxcui}</Text>
            <Text>Name: {drugInfo?.name}</Text>
            <Text>Synonym: {drugInfo?.synonym}</Text>
          </FlexColumn>
        </div>
      </Flex>
      {loading && <LoadingContainer><Loadingindicator size={'large'} /></LoadingContainer>}
      {ndcs.length > 0 && <Flex style={{ marginTop: '20px' }}>
          <div>
            <Header>Associated NDCs:</Header>
            <FlexColumn>
              {ndcs.map((ndc, index) => <Text key={index}>{ndc}</Text>)}
            </FlexColumn>
          </div>
        </Flex>}
    </FlexColumn>
  </PageContainer>
}