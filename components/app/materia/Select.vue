<script setup lang="ts">
import materias, { Materia } from '~~/data/materias'

const props = defineProps<{
  itemLevel: number
  ammHint?: number // amm sockets order, start at 0
}>()

const emits = defineEmits<{
  (event: 'materiaSelected', materia: Materia | null): void
}>()

const borderClasses = {
  socket: 'border-green',
  amm: 'border-red',
  none: 'border-gray/10',
}

const textClasses: Record<Materia['type'], string> = {
  gathering: 'text-yellow',
  perception: 'text-purple',
  gp: 'text-blue',
}

function sortMateriasByTier(type: keyof typeof materias, descending = true) {
  let func = (a: any, b: any) => a.tier - b.tier
  if (descending)
    func = (a, b) => b.tier - a.tier

  return Object.values(materias[type]).sort(func)
}

// the first amm socket is 0, the last safe socket is -1, and so on
const can6810 = computed(() => (props.ammHint ?? 0) <= 0)

const materiaOptions = {
  gathering: sortMateriasByTier('gathering'),
  perception: sortMateriasByTier('perception'),
  gp: sortMateriasByTier('gp'),
}

const minItemLevel = {
  1: 15,
  2: 30,
  3: 45,
  4: 55,
  5: 160,
  6: 290,
  7: 430,
  8: 430,
  9: 560,
  10: 560,
}

function canMeldMateria(item: Materia) {
  // check item level requirement for materia
  if (minItemLevel[item.tier] > props.itemLevel)
    return false
  // check if current is amm socket and filter out incompatiable materias
  if (!can6810.value && [6, 8, 10].includes(item.tier))
    return false
  return true
}

function onSelect(item: Materia) {
  if (!canMeldMateria(item))
    return
  emits('materiaSelected', item)
}
</script>

<template>
  <Panel class="materia-container">
    <div
      v-for="type, i in (['gathering', 'perception', 'gp'] as Materia['type'][])" :key="i"
      class="materia-row"
    >
      <div class="materia-label">
        {{ $t.ui.stat.gathering }}
      </div>
      <div
        v-for="item, j in materiaOptions[type]" :key="j"
        class="materia-list"
        :class="textClasses[item.type]"
        @click="onSelect(item)"
      >
        <div
          class="materia-item"
          :class="[canMeldMateria(item) ? 'hover:bg-light/20 cursor-pointer' : 'text-gray/50']"
        >
          +{{ item.value }}
        </div>
      </div>
    </div>
    <div flex items-center justify-center hover="bg-light/20 cursor-pointer" @click="emits('materiaSelected', null)">
      {{ $t.ui.materia.remove }}
    </div>
  </Panel>
</template>

<style scoped>
.materia-container {
  @apply select-none w-md h-40 grid grid-rows-4;
}

.materia-row {
  @apply grid grid-cols-12;
}

.materia-row > *:nth-child(even) {
  @apply bg-gray/10;
}

.materia-label {
  @apply col-span-2 flex items-center justify-center;
}

.materia-list {}

.materia-item {
  @apply w-full h-full flex items-center justify-center;
}
</style>
