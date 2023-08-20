import { TouchableOpacityProps } from 'react-native'

import { Container, Title, FilterStyleProps } from './styles'

import React from 'react'

type Props = TouchableOpacityProps &
  FilterStyleProps & {
    title: string
  }

export const Filter = ({ title, isActive = false, ...rest }: Props) => {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
