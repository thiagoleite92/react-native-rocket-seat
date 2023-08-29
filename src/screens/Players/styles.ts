import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  flex: 1%;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};

  padding: 24px;
`

export const Form = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 6px;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`
export const HeaderList = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 32px 0 12px;
`
export const PlayersQuantity = styled.TextInput`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_200};
  `}
  text-align: center;
`
