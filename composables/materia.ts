import type { MaybeRef } from '@vueuse/core'
import type { Materia } from '~~/data/materias'

export function useMaterias(initial?: MaybeRef<(Materia | undefined)[]>) {
  const materias = shallowRef(initial ?? [undefined, undefined, undefined, undefined, undefined])

  return {
    materias,
  }
}
