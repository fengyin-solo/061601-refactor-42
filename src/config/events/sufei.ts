import type { GameEventConfig } from '../../types/game'

export const sufeiEvents: GameEventConfig[] = [
  {
    id: 'intro_sufei',
    title: '咖啡馆的偶遇',
    description: '你走进一家新开的咖啡馆，热情的女老板苏菲立刻迎了上来。"欢迎光临！今天想来点什么？"',
    characterId: 'sufei',
    triggerConditions: [
      { type: 'min_day', value: 1 },
      { type: 'max_day', value: 2 },
      { type: 'time_of_day', value: 'afternoon' }
    ],
    choices: [
      {
        id: 'coffee',
        text: '点一杯招牌咖啡',
        effects: [
          { type: 'affinity', characterId: 'sufei', value: 5 },
          { type: 'mood', characterId: 'sufei', value: 10 },
          { type: 'resource', value: -10 },
          { type: 'add_card', cardId: 'sufei_common_1' }
        ]
      },
      {
        id: 'dessert',
        text: '点一份甜点尝尝',
        effects: [
          { type: 'affinity', characterId: 'sufei', value: 7 },
          { type: 'mood', characterId: 'sufei', value: 15 },
          { type: 'resource', value: -20 }
        ]
      }
    ],
    once: true,
    priority: 99
  },
  {
    id: 'cafe_late_night',
    title: '深夜咖啡馆',
    description: '你路过咖啡馆，发现灯还亮着。苏菲一个人在店里，看起来有些疲惫。',
    characterId: 'sufei',
    triggerConditions: [
      { type: 'min_day', value: 5 },
      { type: 'time_of_day', value: 'night' },
      { type: 'min_affinity', characterId: 'sufei', value: 30 },
      { type: 'character_unlocked', characterId: 'sufei' }
    ],
    choices: [
      {
        id: 'help',
        text: '进去帮帮忙',
        effects: [
          { type: 'affinity', characterId: 'sufei', value: 12 },
          { type: 'mood', characterId: 'sufei', value: 15 },
          { type: 'resource', value: -5 }
        ]
      },
      {
        id: 'company',
        text: '点杯咖啡陪陪她',
        effects: [
          { type: 'affinity', characterId: 'sufei', value: 8 },
          { type: 'mood', characterId: 'sufei', value: 10 },
          { type: 'resource', value: -15 }
        ]
      },
      {
        id: 'ignore',
        text: '不打扰她了',
        effects: [{ type: 'affinity', characterId: 'sufei', value: -3 }]
      }
    ],
    once: true,
    priority: 85
  }
]

export default sufeiEvents
