import type { MaybeRef } from '@vueuse/core'
import type { Materia } from '~~/data/materias'

export function useMaterias(initial?: MaybeRef<(Materia | null)[]>) {
  const materias = ref(initial ?? [null, null, null, null, null])

  return {
    materias,
  }
}
