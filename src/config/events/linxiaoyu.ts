import type { GameEventConfig } from '../../types/game'

export const linxiaoyuEvents: GameEventConfig[] = [
  {
    id: 'intro_linxiaoyu',
    title: '图书馆的邂逅',
    description: '你在图书馆寻找一本书时，一位温柔的女生帮你找到了它。她叫林小雨，是这里的管理员。',
    characterId: 'linxiaoyu',
    triggerConditions: [
      { type: 'min_day', value: 1 },
      { type: 'max_day', value: 1 },
      { type: 'time_of_day', value: 'morning' }
    ],
    choices: [
      {
        id: 'thankful',
        text: '道谢并和她聊聊天',
        effects: [
          { type: 'affinity', characterId: 'linxiaoyu', value: 5 },
          { type: 'mood', characterId: 'linxiaoyu', value: 10 },
          { type: 'add_card', cardId: 'linxiaoyu_common_1' }
        ]
      },
      {
        id: 'hurry',
        text: '道谢后匆匆离开',
        effects: [{ type: 'affinity', characterId: 'linxiaoyu', value: 2 }]
      }
    ],
    once: true,
    priority: 100
  },
  {
    id: 'rainy_day_1',
    title: '突如其来的暴雨',
    description: '天空突然下起了大雨，你看到林小雨站在屋檐下，似乎没带伞。',
    characterId: 'linxiaoyu',
    triggerConditions: [
      { type: 'min_day', value: 3 },
      { type: 'time_of_day', value: 'evening' },
      { type: 'min_affinity', characterId: 'linxiaoyu', value: 20 },
      { type: 'character_unlocked', characterId: 'linxiaoyu' }
    ],
    choices: [
      {
        id: 'share_umbrella',
        text: '把伞借给她',
        effects: [
          { type: 'affinity', characterId: 'linxiaoyu', value: 15 },
          { type: 'mood', characterId: 'linxiaoyu', value: 20 }
        ]
      },
      {
        id: 'wait_together',
        text: '陪她等雨停',
        effects: [
          { type: 'affinity', characterId: 'linxiaoyu', value: 10 },
          { type: 'mood', characterId: 'linxiaoyu', value: 10 }
        ]
      },
      {
        id: 'leave',
        text: '假装没看到走开',
        effects: [
          { type: 'affinity', characterId: 'linxiaoyu', value: -5 },
          { type: 'mood', characterId: 'linxiaoyu', value: -10 }
        ]
      }
    ],
    once: true,
    priority: 90
  },
  {
    id: 'birthday_surprise_1',
    title: '小雨的生日',
    description: '你想起今天是林小雨的生日，要准备什么惊喜吗？',
    characterId: 'linxiaoyu',
    triggerConditions: [
      { type: 'min_day', value: 14 },
      { type: 'min_affinity', characterId: 'linxiaoyu', value: 50 },
      { type: 'character_unlocked', characterId: 'linxiaoyu' }
    ],
    choices: [
      {
        id: 'big_surprise',
        text: '准备一个大惊喜',
        effects: [
          { type: 'affinity', characterId: 'linxiaoyu', value: 25 },
          { type: 'mood', characterId: 'linxiaoyu', value: 30 },
          { type: 'resource', value: -50 }
        ]
      },
      {
        id: 'small_gift',
        text: '送一个小礼物',
        effects: [
          { type: 'affinity', characterId: 'linxiaoyu', value: 10 },
          { type: 'mood', characterId: 'linxiaoyu', value: 15 },
          { type: 'resource', value: -20 }
        ]
      },
      {
        id: 'forget',
        text: '算了，假装不知道',
        effects: [
          { type: 'affinity', characterId: 'linxiaoyu', value: -10 },
          { type: 'mood', characterId: 'linxiaoyu', value: -20 }
        ]
      }
    ],
    once: true,
    priority: 95
  }
]

export default linxiaoyuEvents
