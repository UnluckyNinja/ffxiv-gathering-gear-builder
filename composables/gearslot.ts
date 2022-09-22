import type { MaybeRef } from '@vueuse/core'
import type { Gear } from '~~/data/gears'
import gears from '~~/data/gears'
import type { Materia } from '~~/data/materias'

/**
 * @param id specify initial gear id, 0 means no gear
 */
export function useGearSlot(
  slot: MaybeRef<Gear['slot']>,
  gearID?: MaybeRef<keyof typeof gears>,
  initialMaterias?: MaybeRef<(Materia | undefined)[]>,
) {
  const _slot = ref(slot)
  const { id, gear } = useGear(gearID ?? '0', undefined, initialMaterias)
  const equipableGears = computed(() => Object.values(gears).filter(gear => gear.slot === _slot.value))

  return {
    slot: _slot,
    id,
    materias: gear.materias,
    gear,
    equipableGears,
  }
}
