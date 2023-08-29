import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageConfig'

export const groupsGetAll = async (): Promise<Array<string> | undefined> => {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION)

    return storage ? JSON.parse(storage) : []
  } catch (error) {}
}
