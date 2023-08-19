import { ButtonStylesProps, Container, Title } from './styles'
import { TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  title: string
  type?: ButtonStylesProps
}

export const Button = ({ title, type = 'PRIMARY', ...rest }: Props) => {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
