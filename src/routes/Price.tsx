import { useQuery } from 'react-query'
import { fetchCoinHistory } from './api'
import styled from 'styled-components'
import { useState } from 'react'

const CoinPriceList = styled.ul`
  height: 300px;
  overflow-y: auto;
`

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.liColor};
  padding: 10px 20px;
  border-radius: 10px 10px 0 0;
  margin-top: 20px;
`
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`

const PriceList = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.liColor};
  padding: 10px 20px;
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`
const PriceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
  }
  &:hover {
    span {
      color: ${(props) => props.theme.accentColor};
    }
  }
`

interface IHistorical {
  time_open: string
  time_close: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  market_cap: number
}

interface PriceProps {
  coinId: string
}

function Price({ coinId }: PriceProps) {
  const [days, setDays] = useState(15)
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDays(Number(event.target.value))
    setTimeout(() => refetch(), 500)
  }
  const { isLoading, data, refetch } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId, days),
    { refetchInterval: 60000 },
  )
  return (
    <div>
      {isLoading ? (
        'Loading price...'
      ) : (
        <>
          <select onChange={onChange} value={days}>
            <option value="7">7 Days</option>
            <option value="15">15 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
          </select>
          <Overview>
            <OverviewItem>
              <span>DATE</span>
            </OverviewItem>
            <OverviewItem>
              <span>OPEN</span>
            </OverviewItem>
            <OverviewItem>
              <span>HIGH</span>
            </OverviewItem>
            <OverviewItem>
              <span>LOW</span>
            </OverviewItem>
            <OverviewItem>
              <span>CLOSE</span>
            </OverviewItem>
          </Overview>
          <CoinPriceList>
            {data?.reverse().map((price) => (
              <PriceList>
                <PriceItem>
                  <span>{price.time_close.substring(0, 10)}</span>
                </PriceItem>
                <PriceItem>
                  <span>${price.open.toFixed(3)}</span>
                </PriceItem>
                <PriceItem>
                  <span>${price.high.toFixed(3)}</span>
                </PriceItem>
                <PriceItem>
                  <span>${price.low.toFixed(3)}</span>
                </PriceItem>
                <PriceItem>
                  <span>${price.close.toFixed(3)}</span>
                </PriceItem>
              </PriceList>
            ))}
          </CoinPriceList>
        </>
      )}
    </div>
  )
}

export default Price
