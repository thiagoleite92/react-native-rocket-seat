import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { FlatList } from 'react-native'

import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'

import { Container, Form, HeaderList, PlayersQuantity } from './styles'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

type RouteParams = {
  group: string
}

export const Players = () => {
  const route = useRoute()

  const { group } = route.params as RouteParams

  const [team, setTeam] = useState('time a')

  const [players, setPlayers] = useState([])

  return (
    <Container>
      <Header showBackButton />
      <HighLight title={group} subTitle="adicione a galera e separe os times" />

      <Form>
        <Input placeholder="Nome da Pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={['time a', 'time b']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <PlayersQuantity>{players.length}</PlayersQuantity>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => console.log('oi')} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          !players?.length && { flex: 1 },
        ]}
      />

      <Button type="SECONDARY" title="Remover Turma" />
    </Container>
  )
}
