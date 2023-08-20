import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Container, Content, Icon } from './styles'
import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

export const NewGroup = () => {
  const { navigate } = useNavigation()
  const [group, setGroup] = useState('')

  const handleNew = () => {
    navigate('players', { group })
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
