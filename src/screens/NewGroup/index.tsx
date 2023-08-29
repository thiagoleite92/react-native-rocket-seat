import React, { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Container, Content, Icon } from './styles'
import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'

export const NewGroup = () => {
  const { navigate } = useNavigation()
  const [group, setGroup] = useState('')

  const handleNew = async () => {
    try {
      if (!group?.trim()?.length) {
        return Alert.alert('Novo Grupo', 'Informe no nome da Turma')
      }

      await groupCreate(group)
      navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
      }
      console.log(error)
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <HighLight title="Nova Turma" subTitle="crie a turma para adicionar" />
        <Input placeholder="Nome da Turma" onChangeText={setGroup} />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
