import type { MaybeRef } from '@vueuse/core'
import gears from '~~/data/gears'
import type { Materia } from '~~/data/materias'

export function useGear(
  gearID?: MaybeRef<keyof typeof gears>,
  hq?: MaybeRef<boolean>,
  initialMaterias?: MaybeRef<(Materia | null)[]>,
) {
  const id = ref(gearID ?? '0')

  const base = computed(() => {
    const idx = unref(id)
    if (!gears[idx])
      return gears[0]
    return gears[idx]
  })

  const isHq = ref(hq)

  const { materias } = useMaterias(initialMaterias)

  return {
    id,
    gear: {
      base,
      isHq,
      materias,
    } as const,
  }
}
