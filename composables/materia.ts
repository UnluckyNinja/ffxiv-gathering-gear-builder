import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'
import type { Materia } from '~~/data/materias'

export function useMaterias(initial?: MaybeRef<(Materia | null)[]>) {
  const materias: Ref<(Materia | null)[]> = ref(initial ?? [null, null, null, null, null])

  return {
    materias,
  }
}
