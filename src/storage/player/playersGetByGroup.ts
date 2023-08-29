/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PlayerStorageDto } from './PlayerStorageDto'
import { PLAYER_COLLECTION } from '@storage/storageConfig'

export const playersGetByGroup = async (
  group: string,
): Promise<Array<PlayerStorageDto> | undefined> => {
  try {
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)

    return storage ? JSON.parse(storage) : []
  } catch (error) {
    throw error
  }
}
