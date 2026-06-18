import type { GameEventConfig } from '../../types/game'

export const commonEvents: GameEventConfig[] = [
  {
    id: 'conflict_1',
    title: '两人的邀约',
    description: '林小雨和苏菲同时邀请你周末出去，你该怎么办？',
    triggerConditions: [
      { type: 'min_day', value: 10 },
      { type: 'min_affinity', characterId: 'linxiaoyu', value: 35 },
      { type: 'min_affinity', characterId: 'sufei', value: 35 }
    ],
    choices: [
      {
        id: 'choose_xiaoyu',
        text: '答应小雨',
        effects: [
          { type: 'affinity', characterId: 'linxiaoyu', value: 10 },
          { type: 'mood', characterId: 'linxiaoyu', value: 15 },
          { type: 'affinity', characterId: 'sufei', value: -8 },
          { type: 'mood', characterId: 'sufei', value: -10 }
        ]
      },
      {
        id: 'choose_sufei',
        text: '答应苏菲',
        effects: [
          { type: 'affinity', characterId: 'sufei', value: 10 },
          { type: 'mood', characterId: 'sufei', value: 15 },
          { type: 'affinity', characterId: 'linxiaoyu', value: -8 },
          { type: 'mood', characterId: 'linxiaoyu', value: -10 }
        ]
      },
      {
        id: 'reject_both',
        text: '都拒绝，说有事',
        effects: [
          { type: 'affinity', characterId: 'linxiaoyu', value: -3 },
          { type: 'affinity', characterId: 'sufei', value: -3 }
        ]
      },
      {
        id: 'suggest_together',
        text: '建议三个人一起',
        effects: [
          { type: 'affinity', characterId: 'linxiaoyu', value: -2 },
          { type: 'affinity', characterId: 'sufei', value: -2 }
        ]
      }
    ],
    once: true,
    priority: 88
  }
]

export default commonEvents
