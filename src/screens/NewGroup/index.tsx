import React from 'react'
import { Container, Content, Icon } from './styles'
import { Header } from '@components/Header'
import { HighLight } from '@components/HighLight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

export const NewGroup = () => {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <HighLight title="Nova Turma" subTitle="crie a turma para adicionar" />
        <Input />
        <Button title="Criar" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  )
}
