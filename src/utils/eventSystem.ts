import type {
  EventEffect,
  EventCondition,
  EffectType,
  ConditionType,
  GameEventConfig,
  CharacterState,
  TimeOfDay
} from '../types/game'
import gameConfig from '../config/gameConfig'

export interface GameStateContext {
  day: number
  timeSlot: TimeOfDay
  resources: number
  characters: CharacterState[]
  flags: string[]
  triggeredEvents: string[]
  collectedCards: string[]
}

export interface EffectApplyResult {
  nextEventId?: string
  logs: { type: 'event' | 'system'; message: string; characterId?: string }[]
}

export interface EffectMutations {
  updateAffinity: (characterId: string, change: number) => void
  updateMood: (characterId: string, change: number) => void
  updateResources: (change: number) => void
  unlockCharacter: (characterId: string) => void
  addCard: (cardId: string) => void
  addFlag: (flag: string) => void
  removeFlag: (flag: string) => void
}

export type EffectHandler<T extends EventEffect = EventEffect> = (
  effect: T,
  ctx: GameStateContext,
  mutations: EffectMutations
) => EffectApplyResult

export type ConditionChecker<T extends EventCondition = EventCondition> = (
  condition: T,
  ctx: GameStateContext
) => boolean

class EventSystem {
  private effectHandlers = new Map<EffectType, EffectHandler>()
  private conditionCheckers = new Map<ConditionType, ConditionChecker>()

  registerEffect(type: EffectType, handler: EffectHandler) {
    this.effectHandlers.set(type, handler)
  }

  registerCondition(type: ConditionType, checker: ConditionChecker) {
    this.conditionCheckers.set(type, checker)
  }

  applyEffects(
    effects: EventEffect[],
    ctx: GameStateContext,
    mutations: EffectMutations
  ): EffectApplyResult {
    const result: EffectApplyResult = { logs: [] }

    for (const effect of effects) {
      const handler = this.effectHandlers.get(effect.type)
      if (!handler) {
        console.warn(`未找到效果处理器: ${effect.type}`)
        continue
      }
      const subResult = handler(effect, ctx, mutations)
      result.logs.push(...subResult.logs)
      if (subResult.nextEventId) {
        result.nextEventId = subResult.nextEventId
      }
    }

    return result
  }

  checkConditions(conditions: EventCondition[], ctx: GameStateContext): boolean {
    return conditions.every(condition => {
      const checker = this.conditionCheckers.get(condition.type)
      if (!checker) {
        console.warn(`未找到条件检查器: ${condition.type}`)
        return false
      }
      return checker(condition, ctx)
    })
  }

  findTriggerableEvents(
    events: GameEventConfig[],
    ctx: GameStateContext
  ): GameEventConfig[] {
    return events.filter(event => {
      if (event.once && ctx.triggeredEvents.includes(event.id)) {
        return false
      }
      return this.checkConditions(event.triggerConditions, ctx)
    })
  }

  selectHighestPriorityEvent(events: GameEventConfig[]): GameEventConfig | null {
    if (events.length === 0) return null
    return [...events].sort((a, b) => b.priority - a.priority)[0]
  }
}

export const eventSystem = new EventSystem()

eventSystem.registerEffect('affinity', (effect, ctx, mutations) => {
  const e = effect as Extract<EventEffect, { type: 'affinity' }>
  const char = ctx.characters.find(c => c.id === e.characterId)
  const charConfig = gameConfig.characters.find(c => c.id === e.characterId)
  if (!char || !char.unlocked) return { logs: [] }
  mutations.updateAffinity(e.characterId, e.value)
  const sign = e.value > 0 ? '+' : ''
  return {
    logs: [
      {
        type: 'event',
        message: `${charConfig?.name || e.characterId} 好感 ${sign}${e.value}`,
        characterId: e.characterId
      }
    ]
  }
})

eventSystem.registerEffect('mood', (effect, ctx, mutations) => {
  const e = effect as Extract<EventEffect, { type: 'mood' }>
  const char = ctx.characters.find(c => c.id === e.characterId)
  const charConfig = gameConfig.characters.find(c => c.id === e.characterId)
  if (!char || !char.unlocked) return { logs: [] }
  mutations.updateMood(e.characterId, e.value)
  const sign = e.value > 0 ? '+' : ''
  return {
    logs: [
      {
        type: 'event',
        message: `${charConfig?.name || e.characterId} 心情 ${sign}${e.value}`,
        characterId: e.characterId
      }
    ]
  }
})

eventSystem.registerEffect('resource', (effect, ctx, mutations) => {
  const e = effect as Extract<EventEffect, { type: 'resource' }>
  mutations.updateResources(e.value)
  const sign = e.value > 0 ? '+' : ''
  return {
    logs: [{ type: 'event', message: `代币 ${sign}${e.value}` }]
  }
})

eventSystem.registerEffect('next_event', effect => {
  const e = effect as Extract<EventEffect, { type: 'next_event' }>
  return {
    nextEventId: e.eventId,
    logs: []
  }
})

eventSystem.registerEffect('unlock_character', (effect, ctx, mutations) => {
  const e = effect as Extract<EventEffect, { type: 'unlock_character' }>
  const char = ctx.characters.find(c => c.id === e.characterId)
  if (!char || char.unlocked) return { logs: [] }
  mutations.unlockCharacter(e.characterId)
  const charConfig = gameConfig.characters.find(c => c.id === e.characterId)
  return {
    logs: [
      {
        type: 'system',
        message: `✨ 解锁新角色：${charConfig?.name || e.characterId}`
      }
    ]
  }
})

eventSystem.registerEffect('add_card', (effect, ctx, mutations) => {
  const e = effect as Extract<EventEffect, { type: 'add_card' }>
  if (ctx.collectedCards.includes(e.cardId)) return { logs: [] }
  mutations.addCard(e.cardId)
  const card = gameConfig.cards.find(c => c.id === e.cardId)
  return {
    logs: [
      {
        type: 'system',
        message: `🎴 获得卡牌：${card?.name || e.cardId}`
      }
    ]
  }
})

eventSystem.registerEffect('add_flag', (effect, ctx, mutations) => {
  const e = effect as Extract<EventEffect, { type: 'add_flag' }>
  if (ctx.flags.includes(e.flag)) return { logs: [] }
  mutations.addFlag(e.flag)
  return { logs: [] }
})

eventSystem.registerEffect('remove_flag', (effect, ctx, mutations) => {
  const e = effect as Extract<EventEffect, { type: 'remove_flag' }>
  if (!ctx.flags.includes(e.flag)) return { logs: [] }
  mutations.removeFlag(e.flag)
  return { logs: [] }
})

eventSystem.registerCondition('min_day', (condition, ctx) => {
  const c = condition as Extract<EventCondition, { type: 'min_day' }>
  return ctx.day >= c.value
})

eventSystem.registerCondition('max_day', (condition, ctx) => {
  const c = condition as Extract<EventCondition, { type: 'max_day' }>
  return ctx.day <= c.value
})

eventSystem.registerCondition('time_of_day', (condition, ctx) => {
  const c = condition as Extract<EventCondition, { type: 'time_of_day' }>
  return ctx.timeSlot === c.value
})

eventSystem.registerCondition('min_affinity', (condition, ctx) => {
  const c = condition as Extract<EventCondition, { type: 'min_affinity' }>
  const char = ctx.characters.find(ch => ch.id === c.characterId)
  if (!char || !char.unlocked) return false
  return char.affinity >= c.value
})

eventSystem.registerCondition('max_affinity', (condition, ctx) => {
  const c = condition as Extract<EventCondition, { type: 'max_affinity' }>
  const char = ctx.characters.find(ch => ch.id === c.characterId)
  if (!char || !char.unlocked) return false
  return char.affinity <= c.value
})

eventSystem.registerCondition('character_unlocked', (condition, ctx) => {
  const c = condition as Extract<EventCondition, { type: 'character_unlocked' }>
  const char = ctx.characters.find(ch => ch.id === c.characterId)
  return char?.unlocked ?? false
})

eventSystem.registerCondition('has_flag', (condition, ctx) => {
  const c = condition as Extract<EventCondition, { type: 'has_flag' }>
  return ctx.flags.includes(c.flag)
})

eventSystem.registerCondition('has_not_flag', (condition, ctx) => {
  const c = condition as Extract<EventCondition, { type: 'has_not_flag' }>
  return !ctx.flags.includes(c.flag)
})

eventSystem.registerCondition('min_resource', (condition, ctx) => {
  const c = condition as Extract<EventCondition, { type: 'min_resource' }>
  return ctx.resources >= c.value
})

eventSystem.registerCondition('max_resource', (condition, ctx) => {
  const c = condition as Extract<EventCondition, { type: 'max_resource' }>
  return ctx.resources <= c.value
})

export function createGameStateContext(params: {
  day: number
  timeSlot: TimeOfDay
  resources: number
  characters: CharacterState[]
  flags: string[]
  triggeredEvents: string[]
  collectedCards: string[]
}): GameStateContext {
  return {
    day: params.day,
    timeSlot: params.timeSlot,
    resources: params.resources,
    characters: params.characters,
    flags: params.flags,
    triggeredEvents: params.triggeredEvents,
    collectedCards: params.collectedCards
  }
}

export default eventSystem
