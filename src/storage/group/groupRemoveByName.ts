/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig'
import { groupsGetAll } from './groupGetAll'

export const groupRemoveByName = async (groupName: string) => {
  try {
    const storedGroups = await groupsGetAll()
    const filteredGroups = storedGroups?.filter((group) => group !== groupName)

    const groups = JSON.stringify(filteredGroups)

    await AsyncStorage.setItem(GROUP_COLLECTION, groups)
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${GROUP_COLLECTION}`)
  } catch (error) {
    throw error
  }
}
