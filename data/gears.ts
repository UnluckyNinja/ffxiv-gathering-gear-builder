import gears_generated from './gears_generated'

export interface Gear {
  id: string
  icon: string
  slot: 'mainhand' | 'head' | 'body' | 'hands' | 'legs' | 'feet' | 'offhand' | 'ears' | 'neck' | 'wrist' | 'finger' | 'none'
  itemLevel: number
  equipLevel: number
  socketCount: number
  canOvermeld: boolean
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
}

const asGears = <T>(value: { [k in keyof T]: Readonly<Gear> }) => value

export const gearCategoryIcon: Record<Gear['slot'], string> = {
  mainhand: '/image/ui/mainhand.png',
  head: '/image/ui/head.png',
  body: '/image/ui/body.png',
  hands: '/image/ui/hands.png',
  legs: '/image/ui/legs.png',
  feet: '/image/ui/feet.png',
  offhand: '/image/ui/offhand.png',
  ears: '/image/ui/ears.png',
  neck: '/image/ui/neck.png',
  wrist: '/image/ui/wrist.png',
  finger: '/image/ui/finger.png',
  none: '',
}

const gears = asGears({
  0: {
    id: '0',
    icon: '',
    slot: 'none',
    itemLevel: 0,
    equipLevel: 0,
    socketCount: 0,
    canOvermeld: false,
    canBeHQ: true,
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
  },
  ...gears_generated,
} as const)

export default gears
