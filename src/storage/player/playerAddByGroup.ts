/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'

import { PLAYER_COLLECTION } from '@storage/storageConfig'

import { PlayerStorageDto } from './PlayerStorageDto'
import { playersGetByGroup } from './playersGetByGroup'

export const playerAddByGroup = async (
  newPlayer: PlayerStorageDto,
  group: string,
) => {
  try {
    const storedPlayers = (await playersGetByGroup(group)) ?? []

    if (storedPlayers?.filter(({ name }) => name === newPlayer.name)?.length) {
      throw new AppError(
        `Player ${newPlayer.name} already added to another group`,
      )
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
