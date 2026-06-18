import type { GameEventConfig } from '../../types/game'

export const yeqingEvents: GameEventConfig[] = [
  {
    id: 'mysterious_girl',
    title: '神秘的转学生',
    description: '在公园的角落里，你看到一个安静的女生独自坐在长椅上。她似乎注意到了你，微微点了点头。',
    characterId: 'yeqing',
    triggerConditions: [
      { type: 'min_day', value: 7 },
      { type: 'min_affinity', characterId: 'linxiaoyu', value: 20 }
    ],
    choices: [
      {
        id: 'approach',
        text: '上前打招呼',
        effects: [
          { type: 'affinity', characterId: 'yeqing', value: 5 },
          { type: 'affinity', characterId: 'linxiaoyu', value: -3 },
          { type: 'affinity', characterId: 'sufei', value: -3 },
          { type: 'unlock_character', characterId: 'yeqing' },
          { type: 'add_card', cardId: 'yeqing_common_1' }
        ]
      },
      {
        id: 'leave_quietly',
        text: '悄悄离开',
        effects: []
      }
    ],
    once: true,
    priority: 80
  }
]

export default yeqingEvents
