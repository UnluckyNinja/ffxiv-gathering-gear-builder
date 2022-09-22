import foods_generated from './foods_generated'

export interface Food {
  id: string
  icon: string
  itemLevel: number
  canBeHQ: boolean
  stats: {
    gathering: number
    perception: number
    gp: number
  }
  statsHQ: {
    gathering: number
    perception: number
    gp: number
  }
  max: {
    gathering: number
    perception: number
    gp: number
  }
  maxHQ: {
    gathering: number
    perception: number
    gp: number
  }
}

const asFoods = <T>(value: { [k in keyof T]: Readonly<Food> }) => value

const foods = asFoods({
  0: {
    id: '0',
    icon: '',
    itemLevel: 0,
    canBeHQ: false,
    stats: {
      gathering: 0,
      perception: 0,
      gp: 0,
    },
    statsHQ: {
      gathering: 0,
      perception: 0,
      gp: 0,
    },
    max: {
      gathering: 0,
      perception: 0,
      gp: 0,
    },
    maxHQ: {
      gathering: 0,
      perception: 0,
      gp: 0,
    },
  },
  ...foods_generated,
} as const)

export default foods
