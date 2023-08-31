/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { playersGetByGroup } from './playersGetByGroup'

export const playerRemoveByGroup = async (
  playerName: string,
  group: string,
) => {
  try {
    const storage = await playersGetByGroup(group)

    const filteredPlayers = storage?.filter(({ name }) => name !== playerName)

    const players = JSON.stringify(filteredPlayers)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players)
  } catch (error) {
    throw error
  }
}
