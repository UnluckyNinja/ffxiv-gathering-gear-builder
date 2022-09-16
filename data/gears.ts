export interface Gear {
  id: string
  slot: 'mainhand' | 'head' | 'body' | 'hand' | 'leg' | 'foot' | 'offhand' | 'ear' | 'neck' | 'wrist' | 'finger'
  stats: {
    gathering: number
    perception: number
    gp: number
  }
  max: {
    gathering: number
    perception: number
    gp: number
  }
  materiaSlot: number
  canOvermeld: boolean
}

const gears: Gear[] = [
  {
    id: '',
    slot: 'mainhand',
    stats: {
      gathering: 123,
      perception: 123,
      gp: 123,
    },
    max: {
      gathering: 123,
      perception: 123,
      gp: 123,
    },
    materiaSlot: 2,
    canOvermeld: true,
  },
]

export default gears
