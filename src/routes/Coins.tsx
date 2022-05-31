import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { fetchCoins } from './api'

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 10px;
`

const CoinsList = styled.ul``

const Coin = styled.li`
  background-color: ${(props) => props.theme.liColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`

const Loader = styled.span`
  text-align: center;
  display: block;
`

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`

interface ICoin {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins)
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>Just 코인</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>Just 코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  )
}

export default Coins
