import type gears from '~~/data/gears'
import type { Materia } from '~~/data/materias'

const asGearset = <T>(value: { [k in keyof T]: { id: keyof typeof gears; hq: boolean; materias: (Materia | undefined)[] } }) => value

const getDefaultGearset = () => {
  return asGearset({
    mainhand: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
    head: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
    body: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
    hands: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
    legs: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
    feet: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
    offhand: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
    ears: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
    neck: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
    wrist: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
    finger1: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
    finger2: {
      id: '0',
      hq: false,
      materias: [undefined, undefined, undefined, undefined, undefined],
    },
  })
}

export function useGearset(key: string, defaultValue?: ReturnType<typeof getDefaultGearset>) {
  const gearset = useState(key, () => {
    return defaultValue ?? getDefaultGearset()
  })

  return { gearset }
}
