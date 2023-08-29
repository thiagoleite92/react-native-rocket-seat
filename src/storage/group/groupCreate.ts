/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageConfig'
import { groupsGetAll } from './groupGetAll'
import { AppError } from '@utils/AppError'

export const groupCreate = async (newGroup: string) => {
  try {
    const storedGroups = (await groupsGetAll()) ?? []

    if (storedGroups.includes(newGroup)) {
      throw new AppError('Já existe um grupo cadastrado com esse nome.')
    }

    const storage = JSON.stringify([...storedGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}
