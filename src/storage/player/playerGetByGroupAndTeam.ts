/* eslint-disable no-useless-catch */
import { playersGetByGroup } from './playersGetByGroup'

export const playerGetByGrounpAndTeam = async (group: string, team: string) => {
  try {
    const storage = await playersGetByGroup(group)

    const players = storage?.filter((player) => player.team === team)

    return players
  } catch (error) {
    throw error
  }
}
