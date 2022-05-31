import baseStyled, {
  ThemedStyledInterface,
  DefaultTheme,
} from 'styled-components'

export const lightTheme: DefaultTheme = {
  textColor: '#2f3640',
  bgColor: '#f0f0f0',
  accentColor: '#9c88ff',
  liColor: 'white',
}

export const darkTheme: DefaultTheme = {
  textColor: '#f0f0f0',
  bgColor: '#2f3640',
  accentColor: '#9c88ff',
  liColor: 'black',
}

export type Theme = typeof lightTheme
export const styled = baseStyled as ThemedStyledInterface<Theme>
