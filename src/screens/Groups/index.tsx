import { Header } from '@components/Header'
import { Container } from './styles'
import { HighLight } from '@components/HighLight'
import { GroupCard } from '@components/GroupCard'
import { useState } from 'react'
import { FlatList } from 'react-native'

export function Groups() {
  const [groups, setGroups] = useState<Array<string>>([
    'Galera da Rocket',
    'Amigos',
    'Família',
  ])

  return (
    <Container>
      <Header />
      <HighLight title="Turmas" subTitle="Jogue com a sua turma" />

      <GroupCard title="Galera do Fundão" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
      />
    </Container>
  )
}
