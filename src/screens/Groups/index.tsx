import { useState, useCallback } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Container } from './styles'
import { HighLight } from '@components/HighLight'
import { GroupCard } from '@components/GroupCard'
import { FlatList } from 'react-native'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { groupsGetAll } from '@storage/group/groupGetAll'
import { Loading } from '@components/Loading'

export function Groups() {
  const { navigate } = useNavigation()

  const [groups, setGroups] = useState<Array<string> | undefined>([])

  const [isLoading, setIsLoading] = useState(true)

  const handleNewGroup = () => {
    navigate('new')
  }

  const handleOpenGroup = (group: string) => {
    navigate('players', { group })
  }

  const fetchGroups = async () => {
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <Container>
      <Header />
      <HighLight title="Turmas" subTitle="Jogue com a sua turma" />

      {isLoading && <Loading />}

      {!isLoading && (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={!groups?.length && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />
      )}

      <Button title="Criar nova turma" onPress={() => handleNewGroup()} />
    </Container>
  )
}
