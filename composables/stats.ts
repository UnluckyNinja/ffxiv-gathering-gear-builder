import type { UnwrapRef } from 'vue'
import { storeToRefs } from 'pinia'
import type { MaybeRef } from '@vueuse/core'

import type gears from '~~/data/gears'
import type { Materia } from '~~/data/materias'

export function useGearStats(gearID?: MaybeRef<keyof typeof gears>, hq?: MaybeRef<boolean>, materias?: MaybeRef<(Materia | null)[]>) {
  const { id, gear } = useGear(gearID, hq)

  const maxGathering = computed(() => gear.base.max.gathering)
  const maxPerception = computed(() => gear.base.max.perception)
  const maxGP = computed(() => gear.base.max.gp)

  const { materias: materiasArray } = useMaterias(materias)

  // dry helper function
  const calcMateriasStat = (type: Materia['type']) => {
    return materiasArray.value.filter((m, idx) =>
      m && m.type === type && idx < (gear.base.canOvermeld ? 5 : gear.base.socketCount))
      .reduce((total, m) => total + (m?.value ?? 0), 0)
  }
  const materiaGathering = computed(() => calcMateriasStat('gathering'))
  const materiaPerception = computed(() => calcMateriasStat('perception'))
  const materiaGP = computed(() => calcMateriasStat('gp'))

  const gathering = computed(() => {
    const stat = gear.isHq ? gear.base.statsHQ.gathering : gear.base.stats.gathering
    return Math.min(stat + materiaGathering.value, maxGathering.value)
  })
  const perception = computed(() => {
    const stat = gear.isHq ? gear.base.statsHQ.perception : gear.base.stats.perception
    return Math.min(stat + materiaPerception.value, maxPerception.value)
  })
  const gp = computed(() => {
    const stat = gear.isHq ? gear.base.statsHQ.gp : gear.base.stats.gp
    return Math.min(stat + materiaGP.value, maxGP.value)
  })

  return {
    gearID: id,
    gear,
    materias: materiasArray,
    gathering,
    perception,
    gp,
    maxGathering,
    maxPerception,
    maxGP,
    materiaGathering,
    materiaPerception,
    materiaGP,
  }
}

export function useGearsetStats() {
  const { gearset } = storeToRefs(useGearsetStore())
  const allGearsStats = computed(() => {
    return Object.values(gearset.value).map(gear => useGearStats(gear.id, gear.hq, gear.materias))
  })
  const totalGathering = computed(() => {
    return allGearsStats.value.map(stat => stat.gathering.value).reduce((total, curr) => total + curr, 0)
  })
  const totalPerception = computed(() => {
    return allGearsStats.value.map(stat => stat.perception.value).reduce((total, curr) => total + curr, 0)
  })
  const totalGP = computed(() => {
    return allGearsStats.value.map(stat => stat.gp.value).reduce((total, curr) => total + curr, 0)
  })
  const totalMateriaGathering = computed(() => {
    return allGearsStats.value.map(stat => stat.materiaGathering.value).reduce((total, curr) => total + curr, 0)
  })
  const totalMateriaPerception = computed(() => {
    return allGearsStats.value.map(stat => stat.materiaPerception.value).reduce((total, curr) => total + curr, 0)
  })
  const totalMateriaGP = computed(() => {
    return allGearsStats.value.map(stat => stat.materiaGP.value).reduce((total, curr) => total + curr, 0)
  })

  return {
    gearset,
    totalGathering,
    totalPerception,
    totalGP,
    totalMateriaGathering,
    totalMateriaPerception,
    totalMateriaGP,
  }
}

export function useFoodStats(food: ReturnType<typeof useFood> | UnwrapRef<ReturnType<typeof useFood>>, totalStats: { gathering: MaybeRef<number>; perception: MaybeRef<number>; gp: MaybeRef<number> }) {
  const _food = reactive(food)
  const stats = reactive(totalStats)
  const gathering = computed(() => {
    const base = stats.gathering
    const factor = _food.hq ? _food.base.statsHQ.gathering : _food.base.stats.gathering
    const max = _food.hq ? _food.base.maxHQ.gathering : _food.base.max.gathering
    return Math.round(Math.min(base * factor, max))
  })
  const perception = computed(() => {
    const base = stats.perception
    const factor = _food.hq ? _food.base.statsHQ.perception : _food.base.stats.perception
    const max = _food.hq ? _food.base.maxHQ.perception : _food.base.max.perception
    return Math.round(Math.min(base * factor, max))
  })
  const gp = computed(() => {
    const base = stats.gp
    const factor = _food.hq ? _food.base.statsHQ.gp : _food.base.stats.gp
    const max = _food.hq ? _food.base.maxHQ.gp : _food.base.max.gp
    return Math.round(Math.min(base * factor, max))
  })
  return {
    gathering,
    perception,
    gp,
  }
}
