import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { isDarkAtom } from './atoms'

const Nav = styled.nav`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  margin-top: 10px;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 32px;
  }
`

function Header() {
  const isDark = useRecoilValue(isDarkAtom)
  const setDarkAtom = useSetRecoilState(isDarkAtom)
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev)
  return (
    <Nav>
      <button onClick={toggleDarkAtom}>{isDark ? `🌚` : `🌞`}</button>
    </Nav>
  )
}

export default Header
