import { Header } from '@components/Header'
import { Container } from './styles'
import { HighLight } from '@components/HighLight'

export function Groups() {
  return (
    <Container>
      <Header />

      <HighLight title="Turmas" subTitle="Jogue com a sua turma" />
    </Container>
  )
}
