import { useQuery } from 'react-query'
import { fetchCoinHistory } from './api'
import ApexChart from 'react-apexcharts'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from '../atoms'

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

interface ChartProps {
  coinId: string
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom)
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
        'Loading chart...'
      ) : (
        <>
          <select onChange={onChange} value={days}>
            <option value="7">7 Days</option>
            <option value="15">15 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
          </select>
          <ApexChart
            type="candlestick"
            series={[
              {
                data:
                  data?.map((price) =>
                    Object.fromEntries(
                      new Map()
                        .set('x', new Date(price.time_close))
                        .set('y', [
                          price.open.toFixed(3),
                          price.high.toFixed(3),
                          price.low.toFixed(3),
                          price.close.toFixed(3),
                        ])
                        .entries(),
                    ),
                  ) ?? [],
              },
            ]}
            options={{
              theme: { mode: isDark ? 'dark' : 'light' },
              chart: {
                height: 300,
                width: 500,
                toolbar: { show: false },
                background: 'transparent',
              },
              grid: { show: false },
              yaxis: {
                labels: {
                  show: false,
                  formatter: (value) => {
                    return value.toFixed(3)
                  },
                },
                tooltip: {
                  enabled: true,
                },
              },
              xaxis: {
                labels: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                type: 'datetime',
                categories: data?.map((price) => price.time_close),
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: '#1261c4',
                    downward: '#d24f45',
                  },
                },
              },
            }}
          />
        </>
      )}
    </div>
  )
}

export default Chart
