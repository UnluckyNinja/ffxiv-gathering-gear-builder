import type gears from '~~/data/gears'
import type { Materia } from '~~/data/materias'

const asGearset = <T>(
  value: {
    [k in keyof T]: {
      id: keyof typeof gears
      hq: boolean
      materias: (Materia | null)[]
    }
  }) => value

function getEmptyMaterias() {
  return [null, null, null, null, null]
}

const getDefaultGearset = () => {
  return asGearset({
    mainhand: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
    head: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
    body: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
    hands: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
    legs: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
    feet: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
    offhand: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
    ears: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
    neck: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
    wrist: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
    finger1: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
    finger2: {
      id: '0',
      hq: false,
      materias: getEmptyMaterias(),
    },
  })
}

export function useGearset(key: string, defaultValue?: ReturnType<typeof getDefaultGearset>) {
  const gearset = useState(key, () => {
    return defaultValue ?? getDefaultGearset()
  })

  return { gearset }
}
