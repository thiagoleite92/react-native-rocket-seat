import { useRoute } from '@react-navigation/native'
import { Alert, FlatList } from 'react-native'
import { useState } from 'react'

import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'

import { Container, Form, HeaderList, PlayersQuantity } from './styles'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { AppError } from '@utils/AppError'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroup } from '@storage/player/playersGetByGroup'

type RouteParams = {
  group: string
}

export const Players = () => {
  const route = useRoute()

  const { group } = route.params as RouteParams

  const [newPlayerName, setNewPlayerName] = useState('')

  const [team, setTeam] = useState('time a')

  const [players, setPlayers] = useState([])

  const handleAddPlayer = async () => {
    if (!newPlayerName?.trim()?.length) {
      return Alert.alert(
        'Novo jogador(a)',
        'Informe o nome da pessoa para adicionar',
      )
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)

      const players = await playersGetByGroup(group)

      console.log(players)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Player', error.message)
      } else {
        Alert.alert('Novo Player', 'Não foi possível adicionar novo player')
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <HighLight title={group} subTitle="adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome da Pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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
