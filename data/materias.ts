export interface Materia {
  type: 'gathering' | 'perception' | 'gp'
  tier: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  value: number
}

const asMaterias = <T>(value: { [k in keyof T]: Readonly<Materia> }) => value

export const gathering = asMaterias({
  1: {
    type: 'gathering',
    tier: 1,
    value: 3,
  },
  2: {
    type: 'gathering',
    tier: 2,
    value: 4,
  },
  3: {
    type: 'gathering',
    tier: 3,
    value: 5,
  },
  4: {
    type: 'gathering',
    tier: 4,
    value: 6,
  },
  5: {
    type: 'gathering',
    tier: 5,
    value: 10,
  },
  6: {
    type: 'gathering',
    tier: 6,
    value: 15,
  },
  7: {
    type: 'gathering',
    tier: 7,
    value: 12,
  },
  8: {
    type: 'gathering',
    tier: 8,
    value: 20,
  },
  9: {
    type: 'gathering',
    tier: 9,
    value: 14,
  },
  10: {
    type: 'gathering',
    tier: 10,
    value: 25,
  },
} as const)

export const perception = asMaterias({
  1: {
    type: 'perception',
    tier: 1,
    value: 3,
  },
  2: {
    type: 'perception',
    tier: 2,
    value: 4,
  },
  3: {
    type: 'perception',
    tier: 3,
    value: 5,
  },
  4: {
    type: 'perception',
    tier: 4,
    value: 6,
  },
  5: {
    type: 'perception',
    tier: 5,
    value: 10,
  },
  6: {
    type: 'perception',
    tier: 6,
    value: 15,
  },
  7: {
    type: 'perception',
    tier: 7,
    value: 12,
  },
  8: {
    type: 'perception',
    tier: 8,
    value: 20,
  },
  9: {
    type: 'perception',
    tier: 9,
    value: 14,
  },
  10: {
    type: 'perception',
    tier: 10,
    value: 25,
  },
} as const)

export const gp = asMaterias({
  1: {
    type: 'gp',
    tier: 1,
    value: 1,
  },
  2: {
    type: 'gp',
    tier: 2,
    value: 2,
  },
  3: {
    type: 'gp',
    tier: 3,
    value: 3,
  },
  4: {
    type: 'gp',
    tier: 4,
    value: 4,
  },
  5: {
    type: 'gp',
    tier: 5,
    value: 6,
  },
  6: {
    type: 'gp',
    tier: 6,
    value: 8,
  },
  7: {
    type: 'gp',
    tier: 7,
    value: 7,
  },
  8: {
    type: 'gp',
    tier: 8,
    value: 9,
  },
  9: {
    type: 'gp',
    tier: 9,
    value: 8,
  },
  10: {
    type: 'gp',
    tier: 10,
    value: 10,
  },
} as const)

const materias = {
  gathering,
  perception,
  gp,
} as const

export default materias
