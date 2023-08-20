import { Header } from '@components/Header'
import { Container, Form } from './styles'
import { HighLight } from '@components/HighLight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'

export const Players = () => {
  return (
    <Container>
      <Header showBackButton />
      <HighLight
        title="Nome da Turma"
        subTitle="adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome da Pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>
    </Container>
  )
}
