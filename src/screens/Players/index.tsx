import { useRoute, useNavigation } from '@react-navigation/native'
import { Alert, FlatList, TextInput } from 'react-native'
import { useState, useEffect, useCallback, useRef } from 'react'

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
import { playerGetByGrounpAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDto } from '@storage/player/PlayerStorageDto'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'

type RouteParams = {
  group: string
}

export const Players = () => {
  const route = useRoute()
  const { navigate } = useNavigation()

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const { group } = route.params as RouteParams

  const [newPlayerName, setNewPlayerName] = useState('')

  const [team, setTeam] = useState('time a')

  const [players, setPlayers] = useState<Array<PlayerStorageDto> | undefined>(
    [],
  )

  const fetchPlayersByTeam = useCallback(async () => {
    try {
      const playersByTeam = await playerGetByGrounpAndTeam(group, team)

      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert('Players', 'Não foi possível carregar os players do time')
    }
  }, [group, team])

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

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName('')
      await fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Player', error.message)
      } else {
        Alert.alert('Novo Player', 'Não foi possível adicionar novo player')
      }
    }
  }

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await playerRemoveByGroup(playerName, group)

      await fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Player', 'Não foi possível remover player do grupo')
    }
  }

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group)

      navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Grupo', 'Não foi possível remover o grupo')
    }
  }

  const handleGroupRemove = async () => {
    Alert.alert('Remover Grupo', 'Deseja remover grupo?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: async () => await groupRemove(),
      },
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [fetchPlayersByTeam, team])

  return (
    <Container>
      <Header showBackButton />
      <HighLight title={group} subTitle="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da Pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
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
        <PlayersQuantity>{players?.length}</PlayersQuantity>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
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

      <Button
        type="SECONDARY"
        title="Remover Turma"
        onPress={() => handleGroupRemove()}
      />
    </Container>
  )
}
