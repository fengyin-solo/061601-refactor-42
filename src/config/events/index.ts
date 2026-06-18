import type { GameEventConfig } from '../../types/game'
import linxiaoyuEvents from './linxiaoyu'
import sufeiEvents from './sufei'
import yeqingEvents from './yeqing'
import commonEvents from './common'

export const allEvents: GameEventConfig[] = [
  ...linxiaoyuEvents,
  ...sufeiEvents,
  ...yeqingEvents,
  ...commonEvents
]

export function getEventsByCharacter(characterId: string): GameEventConfig[] {
  return allEvents.filter(e => e.characterId === characterId)
}

export function getEventById(id: string): GameEventConfig | undefined {
  return allEvents.find(e => e.id === id)
}

export default allEvents
