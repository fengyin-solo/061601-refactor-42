export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

export type MoodLevel = 'happy' | 'good' | 'neutral' | 'bad' | 'angry'

export type ActionType = 'chat' | 'gift' | 'work'

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface CharacterConfig {
  id: string
  name: string
  avatar: string
  description: string
  personality: string
  favoriteGifts: string[]
  dislikedGifts: string[]
  chatTopics: { topic: string; affinity: number }[]
  baseAffinity: number
  baseMood: number
  unlocked: boolean
  hidden?: boolean
  unlockCondition?: string
}

export interface GiftConfig {
  id: string
  name: string
  price: number
  icon: string
  description: string
}

export interface CardConfig {
  id: string
  name: string
  characterId: string
  rarity: Rarity
  image: string
  description: string
  unlockCondition: string
}

export type EffectType =
  | 'affinity'
  | 'mood'
  | 'resource'
  | 'next_event'
  | 'unlock_character'
  | 'add_card'
  | 'add_flag'
  | 'remove_flag'

export interface BaseEventEffect {
  type: EffectType
}

export interface AffinityEffect extends BaseEventEffect {
  type: 'affinity'
  characterId: string
  value: number
}

export interface MoodEffect extends BaseEventEffect {
  type: 'mood'
  characterId: string
  value: number
}

export interface ResourceEffect extends BaseEventEffect {
  type: 'resource'
  value: number
}

export interface NextEventEffect extends BaseEventEffect {
  type: 'next_event'
  eventId: string
}

export interface UnlockCharacterEffect extends BaseEventEffect {
  type: 'unlock_character'
  characterId: string
}

export interface AddCardEffect extends BaseEventEffect {
  type: 'add_card'
  cardId: string
}

export interface AddFlagEffect extends BaseEventEffect {
  type: 'add_flag'
  flag: string
}

export interface RemoveFlagEffect extends BaseEventEffect {
  type: 'remove_flag'
  flag: string
}

export type EventEffect =
  | AffinityEffect
  | MoodEffect
  | ResourceEffect
  | NextEventEffect
  | UnlockCharacterEffect
  | AddCardEffect
  | AddFlagEffect
  | RemoveFlagEffect

export type ConditionType =
  | 'min_day'
  | 'max_day'
  | 'time_of_day'
  | 'min_affinity'
  | 'max_affinity'
  | 'character_unlocked'
  | 'has_flag'
  | 'has_not_flag'
  | 'min_resource'
  | 'max_resource'

export interface BaseEventCondition {
  type: ConditionType
}

export interface MinDayCondition extends BaseEventCondition {
  type: 'min_day'
  value: number
}

export interface MaxDayCondition extends BaseEventCondition {
  type: 'max_day'
  value: number
}

export interface TimeOfDayCondition extends BaseEventCondition {
  type: 'time_of_day'
  value: TimeOfDay
}

export interface MinAffinityCondition extends BaseEventCondition {
  type: 'min_affinity'
  characterId: string
  value: number
}

export interface MaxAffinityCondition extends BaseEventCondition {
  type: 'max_affinity'
  characterId: string
  value: number
}

export interface CharacterUnlockedCondition extends BaseEventCondition {
  type: 'character_unlocked'
  characterId: string
}

export interface HasFlagCondition extends BaseEventCondition {
  type: 'has_flag'
  flag: string
}

export interface HasNotFlagCondition extends BaseEventCondition {
  type: 'has_not_flag'
  flag: string
}

export interface MinResourceCondition extends BaseEventCondition {
  type: 'min_resource'
  value: number
}

export interface MaxResourceCondition extends BaseEventCondition {
  type: 'max_resource'
  value: number
}

export type EventCondition =
  | MinDayCondition
  | MaxDayCondition
  | TimeOfDayCondition
  | MinAffinityCondition
  | MaxAffinityCondition
  | CharacterUnlockedCondition
  | HasFlagCondition
  | HasNotFlagCondition
  | MinResourceCondition
  | MaxResourceCondition

export interface EventChoice {
  id: string
  text: string
  effects: EventEffect[]
}

export interface GameEventConfig {
  id: string
  title: string
  description: string
  characterId?: string
  triggerConditions: EventCondition[]
  choices: EventChoice[]
  once: boolean
  priority: number
}

export interface ActionConfig {
  type: ActionType
  name: string
  icon: string
  description: string
  cost?: number
  reward?: number
  energyCost: number
}

export interface CharacterState {
  id: string
  affinity: number
  mood: number
  unlocked: boolean
}

export interface LogEntry {
  id: number
  day: number
  time: TimeOfDay
  type: 'action' | 'event' | 'system' | 'story'
  message: string
  characterId?: string
  timestamp: number
}

export interface HistorySnapshot {
  day: number
  timeSlot: TimeOfDay
  actionsRemaining: number
  resources: number
  characters: CharacterState[]
  flags: string[]
  triggeredEvents: string[]
  collectedCards: string[]
  logs: LogEntry[]
}

export interface GameConfig {
  title: string
  initialResources: number
  maxActionsPerDay: number
  daysPerWeek: number
  maxAffinity: number
  minAffinity: number
  maxMood: number
  minMood: number
  moodDecayPerDay: number
  affinityDecayPerDay: number
  timeSlots: TimeOfDay[]
  characters: CharacterConfig[]
  gifts: GiftConfig[]
  cards: CardConfig[]
  events: GameEventConfig[]
  actions: ActionConfig[]
  workRewards: { min: number; max: number }
}
